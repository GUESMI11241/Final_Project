const express = require('express');
const router = express.Router();
const {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// Category routes

// Create a new category
router.post('/addCategorie', addCategory);

// Get all categories
router.get('/allcategories', getAllCategories);

// Get a single category by ID
router.get('/category/:id', getSingleCategory);

// Update a category by ID
router.put('/category/edit/:id', updateCategory);

// Delete a category by ID
router.delete('/category/delete/:id', deleteCategory);

module.exports = router;