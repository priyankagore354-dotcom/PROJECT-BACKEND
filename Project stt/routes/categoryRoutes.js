const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoryController');


const auth  = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

router.post('/create-category',auth,upload.single('image'),createCategory);
router.get('/get-category-list',auth,getAllCategories)

module.exports = router;