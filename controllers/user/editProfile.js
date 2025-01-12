//Only accessible by the user to edit their profile.
//add validation to prevent role, status, etc updation

const User = require('../../models/User.js');

const editProfile = async (req, res) => {
  try {

    const { name, email, phoneNumber, ...updateData } = req.body;

    if (!name || !email || !phoneNumber) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }

    // Prevent unauthorized updates
    const forbiddenFields = ['role', 'status', 'team', 'history', 'createdAt', 'updatedAt'];
    for (const field of forbiddenFields) {
      if (field in req.body) {
        return res.status(403).json({
          message: `You are not authorized to update ${field}`
        });
      }
    }

    const user = await User.findOne({email}).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Save old document to history
    const oldUserDoc = { ...user.toObject() };
    const historyEntry = user.history || [];

    historyEntry.push({
      timestamp: new Date(),
      document: oldUserDoc
    });

    // Update user and return updated document
    const updatedUser = await User.findOneAndUpdate(
      {email},
      {
        $set: {
          ...updateData,
          name,
          email,
          phoneNumber,
          history: historyEntry,
          updatedAt: new Date()
        }
      },
      { new: true, runValidators: true }
    ).select('-password');

    return res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.log('Error editing profile:', error);
    return res.status(500).json({
      message: 'An error occurred while editing the profile.',
      error: error.message
    });
  }
};

module.exports = { editProfile };



//updateUser only for admin makes use of upsert.
//createUser is redundant then remove it. 