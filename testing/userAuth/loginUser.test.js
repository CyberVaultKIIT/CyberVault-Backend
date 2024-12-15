const { loginUser } = require('../../controllers/auth/website/loginUser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/User')

jest.mock('bcrypt')
jest.mock('jsonwebtoken')
jest.mock('../../models/User')

describe('loginUser', () => {
  let req
  let res

  beforeEach(() => {
    req = {
      body: {},
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 400 if required fields are missing', async () => {
    req.body = { email: 'test@example.com', password: 'password123' }

    await loginUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Please fill in all fields',
    })
  })

  it('should return 400 if passwords do not match', async () => {
    req.body = {
      name: 'Test User',
      email: 'test@example.com',
      roll: '123',
      password: 'password123',
      confirmPassword: 'password456',
    }

    await loginUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Passwords do not match' })
  })

  it('should return 404 if user is not found', async () => {
    req.body = {
      name: 'Test User',
      email: 'test@example.com',
      roll: '123',
      password: 'password123',
      confirmPassword: 'password123',
    }

    User.findOne.mockResolvedValue(null)

    await loginUser(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' })
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.send).toHaveBeenCalledWith({ message: 'No user Found' })
  })

  it('should return 400 if password is invalid', async () => {
    req.body = {
      name: 'Test User',
      email: 'test@example.com',
      roll: '123',
      password: 'password123',
      confirmPassword: 'password123',
    }

    const mockUser = { passwordHash: 'hashedPassword' }
    User.findOne.mockResolvedValue(mockUser)
    bcrypt.compare.mockResolvedValue(false)

    await loginUser(req, res)

    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword')
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid password' })
  })

  it('should return 200 and a token if login is successful', async () => {
    req.body = {
      name: 'Test User',
      email: 'test@example.com',
      roll: '123',
      password: 'password123',
      confirmPassword: 'password123',
    }

    const mockUser = {
      userId: 'user123',
      email: 'test@example.com',
      passwordHash: 'hashedPassword',
    }

    User.findOne.mockResolvedValue(mockUser)
    bcrypt.compare.mockResolvedValue(true)
    jwt.sign.mockReturnValue('mockToken')

    await loginUser(req, res)

    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 'user123', email: 'test@example.com' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' },
    )
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith({
      message: 'User Logged In Successfully',
      data: mockUser,
      token: 'mockToken',
    })
  })

  it('should return 500 if there is an error', async () => {
    req.body = {
      name: 'Test User',
      email: 'test@example.com',
      roll: '123',
      password: 'password123',
      confirmPassword: 'password123',
    }

    User.findOne.mockRejectedValue(new Error('Database error'))

    await loginUser(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error finding user',
      error: 'Database error',
    })
  })
})
