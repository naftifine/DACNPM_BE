const express = require('express');
const productController = require('./productController');

const router = express.Router();

router.get('/getAllProduct', productController.getAllProducts);
router.post('/addProduct', productController.addProduct);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);

module.exports = router;
