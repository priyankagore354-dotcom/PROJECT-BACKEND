const express = require('express');
const { registerUser, login, deleteUser, getUserDeatils, updateUserDetails } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();


router.post('/register',registerUser);

router.post('/login',login);

router.delete('/delete/:id',auth,deleteUser);

router.get('/get-user-details/:id',auth,getUserDeatils);

router.patch('/update-user-details/:id',auth,updateUserDetails)


module.exports = router;

