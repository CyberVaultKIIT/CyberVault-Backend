const { changeUserStatus } = require('../../controllers/user/changeUserStatus')
const User = require('../../models/User')

jest.mock('../../models/User')

describe('changeUserStatus Controller', () => {
  let req, res

  beforeEach(() => {
    req = {
      user: {
        userId: 'admin123',
        status: 'active',
        role: 'admin',
      },
      params: { id: 'user123' },
      body: { status: 'inactive', role: 'user' },
    }

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    }
  })

  it('should allow an admin to change the user status successfully', async () => {
    const mockUser = {
      userId: 'user123',
      name: 'John Doe',
      status: 'active',
      role: 'user',
      history: [],
      save: jest.fn().mockResolvedValue(true),
      toObject: jest.fn().mockReturnValue({
        userId: 'user123',
        name: 'John Doe',
        status: 'active',
        role: 'user',
      }),
    }

    User.findOne.mockResolvedValue(mockUser)

    await changeUserStatus(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User status updated successfully',
      data: mockUser,
    })
    expect(mockUser.status).toBe('inactive')
    expect(mockUser.role).toBe('user')
    expect(mockUser.save).toHaveBeenCalled()
  })

  it('should return 403 if the user does not have permission to change status', async () => {
    req.user.status = 'inactive'
    req.user.role = 'user'

    await changeUserStatus(req, res)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      message:
        'Access denied. You do not have permission to change user status.',
    })
  })

  it('should return 400 if neither status nor role is provided', async () => {
    req.body = {}

    await changeUserStatus(req, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Status and role are required to update the user.',
    })
  })

  it('should return 404 if the user is not found', async () => {
    User.findOne.mockResolvedValueOnce(null)

    await changeUserStatus(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User not found',
    })
  })

  it('should return 500 if an error occurs while saving the user', async () => {
    const mockUser = {
      userId: 'user123',
      name: 'John Doe',
      status: 'active',
      role: 'user',
      history: [],
      save: jest.fn().mockRejectedValue(new Error('Database error')),
      toObject: jest.fn().mockReturnValue({
        userId: 'user123',
        name: 'John Doe',
        status: 'active',
        role: 'user',
      }),
    }

    User.findOne.mockResolvedValue(mockUser)

    await changeUserStatus(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error changing user status',
      error: 'Database error',
    })
  })
})
