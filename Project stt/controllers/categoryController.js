const Category = require('../models/categoryModel');

const createCategory = async (req, res) => {

    try {
        

        const { name, description, image, isActive } = req.body;

        const urlRegex = /^(?!https?:\/\/[^\s"'<>\(\)]+\.(?:jpg|jpeg|png|gif|webp|svg)(?:[?#][^\s"']*)?$).*$/

        if (!name) {
            return res.status(400).json(
                {
                    "message": "Invalid category name"
                }
            )
        }

        console.log(req?.file)

      const imgurl = `${req.protocol}://${req.get("host")}/uploads/packages/${req?.file?.filename}`


        const checkCategory = await Category.findOne({ name });

        if (checkCategory) {
            return res.status(400).json(
                {
                    message: "Category already exist"
                }
            )
        }

        const category = new Category({
            name,
            description,
            image:imgurl,
            isActive
        });
        await category.save();

        return res.status(201).json(
            {
                "message": "Category Saved Successfully",
                category: category
            }
        )

        // const savedCategory = await 

    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        )
    }

}

const getAllCategories = async (req, res) => {
    try {

        const fetchedCategoryList = await Category.find({ isActive: true });

        return res.status(200).json(
            {
                count: fetchedCategoryList.length,
                categories: fetchedCategoryList
            }
        )

    } catch (error) {
        return res.status(500).json(
            {
                "message": error.message
            }
        )
    }
}

module.exports = { createCategory, getAllCategories }