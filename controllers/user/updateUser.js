const User = require('../../models/User')

const updateUser = async (req, res) => {
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
        message: 'Access denied. You do not have permission to update users.',
      })
    }

    const userId = req.params.id
    const updateData = req.body

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

    Object.keys(updateData).forEach((key) => {
      if (key !== 'passwordHash' && key !== 'createdAt') {
        user[key] = updateData[key]
      }
    })

    if (updateData.createdAt) {
      user.createdAt = user.createdAt
    }

    user.updatedAt = new Date()

    await user.save()

    return res
      .status(200)
      .json({ message: 'User updated successfully', data: user })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error updating user', error: error.message })
  }
}

module.exports = { updateUser }
