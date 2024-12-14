const express = require('express');
const router = express.Router();

const authMiddleware = require('../auth/authMiddlewares');
const chatController = require('./chatControllers');

const isAuth = authMiddleware.isAuth;

router.post('/load', isAuth, chatController.getMessages);
router.post('/user', isAuth, chatController.getUsers)

module.exports = router;