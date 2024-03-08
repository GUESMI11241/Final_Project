const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a user model for authenticated users
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    default: 'Not Processed',
    enum: [
      'Not Processed',
      'Processing',
      'Dispatched',
      'Cancelled',
      'Delivered',
    ],
  },
  // New fields for shipment and command details
  shipmentDetails: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
    apartment: String,
    countryState: String,
   
    // Add more fields as needed
  },

  noteAboutOrder: String,
  paymentMethod: {
    cheque: Boolean,
    cash: Boolean,
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);