const express = require('express');
const router = express.Router();
const Product = require('../../models/product'); // Assuming this is your Mongoose model

// Route to get unique subcategories
router.get('/AllSubCategory', async (req, res) => {
  try {
    const products = await Product.find();
    const allCategories = products.map(product => product.sub_category);
    const uniqueCategories = Array.from(new Set(allCategories));
    res.json(uniqueCategories);
  } catch (error) {
    console.error('Error fetching filtered products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
