const express = require("express");
const {
  addProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

const router = express.Router();
 
router.post("/addProduct", addProduct); // avec image 
router.get("/product/:id", getaProduct);
router.put("/product/edit/:id",  updateProduct);  // modif d'image 
router.delete("/product/delete/:id", deleteProduct); // suppression d'image from uploads 
router.get("/allproducts", getAllProduct);
 
module.exports = router;