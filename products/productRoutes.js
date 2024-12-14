const express = require('express');
const authMiddleware = require('../auth/authMiddlewares');
const productController = require('./productController');

const router = express.Router();
const isAuth = authMiddleware.isAuth;

router.get('/getAllProduct', isAuth,productController.getAllProducts);
router.get('/search', isAuth, productController.searchProduct);
router.post('/addProduct', isAuth, productController.addProduct);
router.put('/updateProduct/:id', isAuth, productController.updateProduct);
router.delete('/deleteProduct/:id', isAuth, productController.deleteProduct);

module.exports = router;
