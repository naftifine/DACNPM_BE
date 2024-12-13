const express = require('express');
const router = express.Router();
const userController = require('./userControllers');

const authMiddleware = require('../auth/authMiddlewares');

const isAuth = authMiddleware.isAuth;

router.post('/profile', isAuth, userController.getUserByUsername);
router.post('/edit', isAuth, userController.editUserByUsername);

module.exports = router;
