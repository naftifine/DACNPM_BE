const express = require('express');
const router = express.Router();

const authMiddleware = require('../auth/authMiddlewares');
const chatController = require('./chatControllers');

const isAuth = authMiddleware.isAuth;

router.get('/load', isAuth, chatController.getMessages);
// router.put('/send', isAuth, chatController.sendMessages);

module.exports = router;