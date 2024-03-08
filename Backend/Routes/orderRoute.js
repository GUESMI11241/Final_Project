const express = require('express');
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder 
} = require('../Controllers/orderController');


// Create a new order
router.post('/addOrder', createOrder); //user 

// Get all orders
router.get('/allOrder', getAllOrders); // admin 

// Get an order by ID
router.get('/order/:id', getOrderById); //user , admin 

router.put('/order/update',updateOrderStatus); // admin 

router.delete('/order/delete/:id',deleteOrder ); // admin 

module.exports = router;
