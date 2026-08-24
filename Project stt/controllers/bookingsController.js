const Package = require('../models/packageModel')
const Booking = require('../models/bookingsModel')
const User = require('../models/userModel')

const createBooking = async (req, res) => {

    try {

        const { package_id, travelDate, guests } = req.body;
        const user = req.user


        const userData = await User.findById(user.id);
        const packageData = await Package.findById(package_id);

        if (!packageData) {
            return res.status(404).json({
                message: "Packages not found"
            })
        }

        if (guests > packageData.availableSeats) {
            return res.status(400).json({
                message: "Not enough seats available"
            })
        }

        const totalAmount = guests * packageData.price;

        const booking = new Booking({
            user: userData,
            package: packageData,
            travelDate,
            guests,
            totalAmount: totalAmount
        })

        await booking.save();

        return res.status(201).json(
            {
                "message": "Booking Confirmed"
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        )
    }

}

const getBookingsList = async (req, res) => {

    try {

        const { minPrice, maxPrice } = req.query;

        const bookingsList = await Booking.find();

        if (bookingsList?.length == 0) {
            res.status(200).json(
                {
                    message: "No records found"
                }
            )
        }

        return res.status(200).json(
            {
                count: bookingsList.length,
                booking_list: bookingsList
            }
        )

        console.log(bookingsList)


    } catch (error) {
        res.status(401).json(
            {
                message: error.message
            }
        )
    }
}

const getbookingDetails=async(req,res)=>{

    try {

        const bookingDetails = await Booking.findById(req.params?.id);
        
        return res.status(200).json(
            {
                message:"Success",
                booking_details:bookingDetails
            }
        )
        
    } catch (error) {
        res.status(500).json(
            {
                message:error.message
            }
        )
    }
}

const getMyBookings =async(req,res)=>{
    try {
        const {id} = req.user;
        const bookings = await Booking.find({user:id}).populate({
            path:"package",
            populate:{
                path:"category"
            }
        })

        // const bookings = await Booking.find({user:id}).populate("user","name email").populate("package")
        
        return res.status(200).json(
            {
                count:bookings.length,
                bookings_list:bookings
            }
        )

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


module.exports = { createBooking, getBookingsList,getbookingDetails,getMyBookings }
