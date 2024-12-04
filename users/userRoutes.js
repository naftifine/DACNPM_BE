const express = require('express');
const router = express.Router();
const userController = require('./userControllers');


router.get('/profile', userController.getUserByUsername);

module.exports = router;
