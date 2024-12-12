const express = require('express');
const router = express.Router();

const adminController = require('./adminControllers');

router.post('/login', adminController.login);

module.exports = router;
