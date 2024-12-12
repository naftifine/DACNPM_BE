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


        const messages = await chatModel.getMessages(sendID.UserID, receiverID.UserID);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

