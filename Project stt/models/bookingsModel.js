const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        package:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Package",
            required:true
        },
        travelDate:{
            type:Date,
            required:true
        },
        guests:{
            type:Number,
            required:true,
            min:1
        },
        totalAmount:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum:["pending","confirmed","cancelled","completed"],
            default:"pending"
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Booking",bookingSchema)