const express = require('express');
const authMiddleware = require('../auth/authMiddlewares');
const productController = require('./productController');

const router = express.Router();
const isAuth = authMiddleware.isAuth;

router.get('/getAllProduct', productController.getAllProducts);
router.get('/search', productController.search);
router.get('/getProductById', productController.getProductById);
router.get('/getProductByUserId', productController.getProductByUserid);
router.post('/addProduct', productController.addProduct);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;
