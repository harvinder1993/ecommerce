const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/product')
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/product/create').post(createProduct);
router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails)

module.exports = router;