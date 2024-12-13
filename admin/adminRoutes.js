const express = require('express');
const router = express.Router();

const adminController = require('./adminControllers');
const isAuth = require('../auth/authMethods');

router.post('/login', adminController.login);

module.exports = router;
