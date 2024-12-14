const { getUser, editUser, getUserById } = require('./userModels'); 

exports.getUserByUserid = async (req, res) => {
    const userid = req.body.userid;
    
    try {
        const user = await getUserById(userid);
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

exports.editUserByUsername = async (req, res) => {
    const user = req.body;
    try {
        const result = await editUser(user);
        if (result) {
            return res.status(200).send('Chỉnh sửa thành công');
        }   
    }
    catch (err) {
        console.error('Error getting user:', err);
        return res.status(500).json({ message: 'Server error' });
    }
}