const express = require('express');
const productController = require('./productController');

const router = express.Router();

router.get('/getAllProduct', productController.getAllProducts);
router.get('/search', productController.search);
router.get('/getProductById', productController.getProductById);
router.get('/getProductByUserId', productController.getProductByUserid);
router.post('/addProduct', productController.addProduct);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;
