const User = require('../../models/User')

const changeUserStatus = async (req, res) => {
  try {
    const allowedRoles = [
      'admin',
      'web',
      'leadWeb',
      'eventManagement',
      'leadEventManagement',
      'coreCyber',
      'leadCoreCyber',
      'contentCreation',
      'leadContentCreation',
      'marketing',
      'leadMarketing',
      'broadcasting',
      'leadBroadcasting',
      'designing',
      'leadDesigning',
    ]

    const currentUser = req.user

    if (
      currentUser.status !== 'active' ||
      !allowedRoles.includes(currentUser.role)
    ) {
      return res.status(403).json({
        message:
          'Access denied. You do not have permission to change user status.',
      })
    }

    const userId = req.params.id
    const { status, role } = req.body

    if (!status && !role) {
      return res.status(400).json({
        message: 'Status and role are required to update the user.',
      })
    }

    const user = await User.findOne({ userId })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const oldUserDoc = { ...user.toObject() }
    delete oldUserDoc.passwordHash

    const historyEntry = {
      timestamp: new Date(),
      document: oldUserDoc,
    }

    user.history.push(historyEntry)

    user.status = status
    user.role = role
    user.updatedAt = new Date()

    if (user.createdAt) {
      user.createdAt = user.createdAt
    }

    await user.save()

    return res
      .status(200)
      .json({ message: 'User status updated successfully', data: user })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error changing user status', error: error.message })
  }
}

module.exports = { changeUserStatus }
