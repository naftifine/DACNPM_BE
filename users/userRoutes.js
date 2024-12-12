const express = require('express');
const router = express.Router();
const userController = require('./userControllers');

const authMiddleware = require('../auth/authMiddlewares');

const isAuth = authMiddleware.isAuth;


router.get('/profile', isAuth, userController.getUserByUsername);
// router.get('/profile', isAuth, userController.getUser);

router.post('/profile', isAuth, userController.editUserByUsername);

module.exports = router;
