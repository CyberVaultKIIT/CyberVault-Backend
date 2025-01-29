const User = require('../../models/User');

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
    ];

    const currentUser = req.user;

    // Check user permission
    if (
      currentUser.status !== 'active' ||
      !allowedRoles.includes(currentUser.role)
    ) {
      return res.status(403).json({
        message: 'Access denied. You do not have permission to update users.',
      });
    }

    // Extract and validate data
    const { email, password, ...updateData } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Save old user document for history
    const oldUserDoc = { ...user.toObject() };
    const historyEntry = user.history || [];
    historyEntry.push({
      timestamp: new Date(),
      document: oldUserDoc,
    });

    // Update user using updateOne
    const result = await User.updateOne(
      { email }, // Filter by email
      {
        $set: {
          ...updateData,
          history: historyEntry,
          updatedAt: new Date(),
        },
      }
    );

    if (result.nModified === 0) {
      return res.status(400).json({ message: 'No changes made to the user.' });
    }

    // Respond with success
    return res
      .status(200)
      .json({ message: 'User updated successfully', data: result });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'Error updating user', error: error.message });
  }
};

module.exports = { updateUser };
