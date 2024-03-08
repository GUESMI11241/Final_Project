const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // If you have a user model for authenticated users
  },
  items: [cartItemSchema],
  total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Cart', cartSchema);