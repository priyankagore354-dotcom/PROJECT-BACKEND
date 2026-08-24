const mongoose = require('mongoose');

const packageSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true,"Title is required"],
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        destination: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category",
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        duration: {
            days: {
                type: Number,
                required: true,
            },
            nights: {
                type: Number,
                required: true
            }
        },
        maxGuests: {
            type: Number,
            required: true,
            min: 1,
            max:150
        },
        availableSeats: {
            type: Number,
            required: true,
            min: 0
        },
        images: [
            {
                type: [String],
                default: []
            }
        ],
        inclusions: [
            {
                type: [String],
                default: []
            }
        ],
        exclusions: [
            {
                type: [String],
                default: []
            }
        ],
        itinerary: [
            {
                day: {
                    type: Number,
                    reauire: true,
                    min: 1
                },
                title: {
                    type: String,
                    required: true,
                    trim: true
                },
                description: {
                    type: String,
                    required: true,
                    trim: true
                },
            }
        ],
        isActive: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Package",packageSchema)