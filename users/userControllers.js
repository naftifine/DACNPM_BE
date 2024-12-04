const { getUser } = require('./userModels'); 

exports.getUserByUsername = async (req, res) => {
    const username = req.body.username.toLowerCase();
    
    try {
        const user = await getUser(username);

        if (user) {
            return res.send(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error getting user:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
