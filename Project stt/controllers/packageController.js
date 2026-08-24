const Package = require('../models/packageModel')

const createPackage = async (req, res) => {

    try {
        const { title, description, destination, category, price, duration,
            maxGuests, availableSeats, images, inclusions, exclusions, itinerary, isActive } = req.body;
        
        const generateImageUrls = req?.files?.map((file)=>{
            return `${req.protocol}://${req.get("host")}/uploads/packages/${file.filename}`
        })

        const package = new Package({
            title,
            description,
            destination,
            category,
            price,
            duration:JSON.parse(duration),
            maxGuests, 
            availableSeats,
            images:generateImageUrls, 
            inclusions, 
            exclusions,
            itinerary:JSON.parse(itinerary), 
            isActive
        });

        await package.save();
        res.status(201).json(
            {
                message: "Package Created successfully",
                package: package
            }
        )
    } catch (error) {
        res.status(500).json(
            {
                message: error.message
            }
        )
    }
}

const deletePackage = async(req,res)=>{
    try {
        
        const {id} = req.params;

        const deletedPackage = await Package.findByIdAndDelete(id);
        if(!deletedPackage){
            return  res.status(404).json(
            {
                mesasge:"Package not found"
            }
        )
        }
        console.log(deletedPackage)
        res.status(200).json(
            {
                mesasge:"Package deleted Successfully"
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

const updatePackage = async(req,res)=>{
    try {
       
        const {id} = req.params;

        const updatedPackage = await Package.findByIdAndUpdate(
            id,
            req.body,
            {
                new:true
            }
        )

        res.status(200).json(
            {
                message:"Package Updated successfully",
                package:updatedPackage
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
const getAllPackages = async(req,res)=>{
    try {
        
        let {page,limit} = req.query;

        page = parseInt(page) || 1
        limit = parseInt(limit) || 5

        const skip = (page-1) * limit;

        const packages = await Package.find({
            isActive:true,
        }).skip(skip).limit(limit)

        res.status(200).json(
            {
                count: packages.length,
                packages:packages
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

module.exports = { createPackage,deletePackage,updatePackage,getAllPackages }