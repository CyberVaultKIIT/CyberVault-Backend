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

    if (user.status !== 'active' || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        message: 'Access denied. You do not have permission to create users.',
      })
    }

    const { userId } = req.params
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
      if (key !== 'passwordHash') {
        user[key] = updateData[key]
      }
    })

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
