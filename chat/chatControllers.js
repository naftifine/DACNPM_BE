const chatModel = require('./chatModels');
const userModel = require('../users/userModels');

exports.getMessages = async (req, res) => {
    const { sender, receiver } = req.body;

    try {
        if (!sender || !receiver) {
            return res.status(400).json({ error: 'SenderID and ReceiverID are required.' });
        }
        const sendID = await userModel.getUser(sender);

        const receiverID = await userModel.getUser(receiver);


        const messages = await chatModel.getMessages(sendID.username, receiverID.username);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsers = async (req, res) => {
    const { username } = req.body;
    try
    {
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        const result = await chatModel.getUser(username);
        res.status(200).json(result);
    }
    catch (error)
    {
        res.status(500).json({ error: error.message });
    }
};
