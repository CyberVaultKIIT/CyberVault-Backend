const { createUser } = require('../../controllers/user/createUser') // Adjust the path accordingly
const bcrypt = require('bcrypt')
const User = require('../../models/User')

// Mocking dependencies
jest.mock('bcrypt')
jest.mock('../../models/User')

describe('createUser', () => {
  let req
  let res
  let next

  beforeEach(() => {
    req = {
      body: {
        userId: '123',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phoneNumber: '1234567890',
        branch: 'Engineering',
        roll: '12345',
        batch: 'A',
        year: '2024',
        role: 'admin',
        socialLinks: {},
        optional: {},
      },
      user: {
        status: 'active',
        role: 'admin',
      },
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    }
    next = jest.fn()
  })

  it('should return 401 if no user is provided', async () => {
    req.user = null // Simulate an unauthorized user

    await createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized access.' })
  })

  it('should return 403 if the user does not have permission to create users', async () => {
    req.user = { status: 'inactive', role: 'viewer' } // Simulate a user with insufficient permissions

    await createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Access denied. You do not have permission to create users.',
    })
  })

  it('should return 400 if required fields are missing', async () => {
    req.body = { ...req.body, email: '' } // Simulate a missing email

    await createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Please fill all the fields',
    })
  })

  it('should return 400 if a user with the same email already exists', async () => {
    // Simulate an existing user with the same email
    User.findOne.mockResolvedValueOnce({ email: 'john@example.com' })

    await createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User with the same email or roll number already exists.',
    })
  })

  it('should return 500 if an error occurs while creating the user', async () => {
    // Simulate an error during user creation
    User.findOne.mockRejectedValueOnce(new Error('Database error'))

    await createUser(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'An error occurred while creating the user.',
      error: 'Database error',
    })
  })
})
