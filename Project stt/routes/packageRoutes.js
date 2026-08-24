const express = require('express');
const { createPackage, deletePackage, updatePackage, getAllPackages } = require('../controllers/packageController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');


const router = express.Router();

router.post('/create-package',auth,upload.array('images',12),createPackage);
router.delete('/delete-package/:id',auth,deletePackage);
router.patch('/update-package/:id',auth,updatePackage);
router.get('/get-all-packages',getAllPackages)



module.exports = router;