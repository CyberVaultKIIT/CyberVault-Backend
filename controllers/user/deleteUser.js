const User = require('../../models/User')

const deleteUser = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.updateOne({ email}, {$set:{role:"user", status: "suspended"}})

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res
      .status(200)
      .json({ message: 'User deleted successfully', data: user })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: 'Error deleting user', error: error.message })
  }
}

module.exports = { deleteUser }
