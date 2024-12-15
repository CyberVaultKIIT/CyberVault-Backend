const { registerUser } = require('../../controllers/auth/website/registerUser')
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

jest.mock('../../models/User')
jest.mock('bcrypt')
jest.mock('jsonwebtoken')

const mockRequest = (body) => ({
  body,
})

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  res.cookie = jest.fn()
  return res
}

describe('registerUser', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should register a user successfully', async () => {
    const req = mockRequest({
      userId: '12345',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      phoneNumber: '1234567890',
      branch: 'CS',
      roll: '123',
      batch: '2024',
      year: '4',
      createdAt: '2024-12-12',
      updatedAt: '2024-12-12',
      socialLinks: {},
      optional: {},
    })
    const res = mockResponse()

    User.findOne.mockResolvedValue(null)
    bcrypt.hash.mockResolvedValue('hashedPassword123')
    jwt.sign.mockReturnValue('mockToken')

    const mockUser = {
      userId: '12345', // Ensure these fields are included
      email: 'johndoe@example.com',
      save: jest.fn().mockResolvedValue(true),
    }
    User.mockImplementation(() => mockUser)

    await registerUser(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ email: 'johndoe@example.com' })
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12)
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: '12345', email: 'johndoe@example.com' },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' },
    )
    expect(mockUser.save).toHaveBeenCalled()
    expect(res.cookie).toHaveBeenCalledWith('authToken', 'mockToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    })
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User created successfully',
      data: mockUser,
      token: 'mockToken',
    })
  })

  it('should return 400 if required fields are missing', async () => {
    const req = mockRequest({
      userId: '',
      name: '',
      email: '',
      password: '',
      roll: '',
    })
    const res = mockResponse()

    await registerUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Please fill all the fields',
    })
  })

  it('should return 400 if email already exists', async () => {
    const req = mockRequest({
      userId: '12345',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      roll: '123',
    })
    const res = mockResponse()

    User.findOne.mockResolvedValue(true)

    await registerUser(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ email: 'johndoe@example.com' })
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Email already exists',
    })
  })

  it('should return 500 if token generation fails', async () => {
    const req = mockRequest({
      userId: '12345',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      roll: '123',
    })
    const res = mockResponse()

    User.findOne.mockResolvedValue(null)
    bcrypt.hash.mockResolvedValue('hashedPassword123')
    jwt.sign.mockReturnValue(null)

    const mockUser = {
      save: jest.fn().mockResolvedValue(true),
    }
    User.mockImplementation(() => mockUser)

    await registerUser(req, res)

    expect(jwt.sign).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Failed to generate token',
    })
  })

  it('should return 500 if there is a server error', async () => {
    const req = mockRequest({
      userId: '12345',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
      roll: '123',
    })
    const res = mockResponse()

    User.findOne.mockRejectedValue(new Error('Database error'))

    await registerUser(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error creating user',
      error: 'Database error',
    })
  })
})
