const express = require('express');
const categoryController = require('./categoryController');

const router = express.Router();

router.get('/getListCategory', categoryController.getListCategory)
router.get('/getProductbyCategory/:id', categoryController.getProductbyCategory);
router.post('/insertCategory', categoryController.insertCategory);
router.put('/updateCategory/:id', categoryController.updateCategory);
router.delete('/deleteCategory/:id', categoryController.deleteCategory);

module.exports = router;
