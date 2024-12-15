const { updateUser } = require('../../controllers/user/updateUser')
const User = require('../../models/User')

jest.mock('../../models/User')

const mockRequest = (params, body, user) => ({
  params,
  body,
  user,
})

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('updateUser', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should update the user successfully', async () => {
    const req = mockRequest(
      { id: '12345' },
      { status: 'active', role: 'web' },
      { role: 'admin', status: 'active' },
    )
    const res = mockResponse()

    const mockUser = {
      userId: '12345',
      status: 'inactive',
      role: 'member',
      history: [],
      save: jest.fn().mockResolvedValue(true),
      toObject: jest.fn().mockReturnValue({ userId: '12345', role: 'member' }),
    }

    User.findOne.mockResolvedValue(mockUser)

    await updateUser(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ userId: '12345' })
    expect(mockUser.history).toHaveLength(1)
    expect(mockUser.status).toBe('active')
    expect(mockUser.role).toBe('web')
    expect(mockUser.save).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User updated successfully',
      data: mockUser,
    })
  })

  it('should return 403 if the current user does not have permission', async () => {
    const req = mockRequest(
      { id: '12345' },
      { status: 'active', role: 'web' },
      { role: 'member', status: 'inactive' },
    )
    const res = mockResponse()

    await updateUser(req, res)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Access denied. You do not have permission to update users.',
    })
  })

  it('should return 404 if the user is not found', async () => {
    const req = mockRequest(
      { id: '12345' },
      { status: 'active', role: 'web' },
      { role: 'admin', status: 'active' },
    )
    const res = mockResponse()

    User.findOne.mockResolvedValue(null)

    await updateUser(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ userId: '12345' })
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' })
  })

  it('should return 500 if there is a server error', async () => {
    const req = mockRequest(
      { id: '12345' },
      { status: 'active', role: 'web' },
      { role: 'admin', status: 'active' },
    )
    const res = mockResponse()

    User.findOne.mockRejectedValue(new Error('Database error'))

    await updateUser(req, res)

    expect(User.findOne).toHaveBeenCalledWith({ userId: '12345' })
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error updating user',
      error: 'Database error',
    })
  })

  it('should handle missing update data gracefully', async () => {
    const req = mockRequest(
      { id: '12345' },
      {},
      { role: 'admin', status: 'active' },
    )
    const res = mockResponse()

    const mockUser = {
      userId: '12345',
      status: 'inactive',
      role: 'member',
      history: [],
      save: jest.fn().mockResolvedValue(true),
      toObject: jest.fn().mockReturnValue({ userId: '12345', role: 'member' }),
    }

    User.findOne.mockResolvedValue(mockUser)

    await updateUser(req, res)

    expect(mockUser.status).toBe('inactive')
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      message: 'User updated successfully',
      data: mockUser,
    })
  })
})
