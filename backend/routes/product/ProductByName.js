const express = require('express');
const router = express.Router();
const Product = require('../../models/product'); 

router.get('/pid', async (req, res) => {
    const pid = req.query.name;
    try {
      let products;
      if (pid) {
        products = await Product.find({ p_id: pid });
      }
  
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
