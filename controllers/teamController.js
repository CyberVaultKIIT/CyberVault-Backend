const User = require('../models/User'); 

const getTeamMembers = async (req, res) => {
    try {
        const { role, userid } = req.query;
        
        if (userid) {
            const user = await User.findById(userid).select('-password');
            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }
            return res.json({ success: true, user: user });
        }

        let query = {};
        if (role) {
            query.role = role;
        }
      
        
        const members = await User.find(query).select('-password');
        res.json({ success: true, users: members });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = { getTeamMembers };
