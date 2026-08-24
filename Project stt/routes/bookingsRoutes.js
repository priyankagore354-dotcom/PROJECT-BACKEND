const express = require('express');
const auth = require('../middleware/auth');
const { createBooking, getBookingsList, getbookingDetails, getMyBookings } = require('../controllers/bookingsController');

const router = express.Router();

router.post('/create-booking',auth,createBooking);
router.get('/get-all-bookings',auth,getBookingsList);
router.get('/get-booking-details/:id',auth,getbookingDetails);
router.get('/get-my-bookings',auth,getMyBookings)

module.exports = router