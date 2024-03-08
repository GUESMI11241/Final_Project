const express = require('express');
const {
  addToCart,
  getCart,
  updateCartItem,
  deleteCartItem,
  deleteCart
} = require('../Controllers/cartController');


const router = express.Router();

// Add a product to the cart
router.post('/addCart', addToCart);

// Get the user's cart
router.get('/cart/:id', getCart);

// Update cart item quantity
router.put('/cart/update/:idUser', updateCartItem);
// Delete an item from the cart
router.delete('/cart/delete/:itemId/:idUser', deleteCartItem);

router.delete('/cart/delete/:idUser',deleteCart);

module.exports = router;
