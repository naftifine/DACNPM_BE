const express = require('express');
const authMiddleware = require('../auth/authMiddlewares');
const orderController = require('./productController');

const router = express.Router();
const isAuth = authMiddleware.isAuth;

router.get('/getOrder/:id', isAuth, orderController.getOrder);
router.post('/addOrder', isAuth, orderController.addOrder);
router.put('/updateOrder/:id', isAuth, orderController.updateOrder);
router.delete('/deleteOrder/:id', isAuth, orderController.deleteOrder);

module.exports = router;
