const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const emailRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        if(!emailRegex.test(email)){
            return res.status(400).json(
                {
                    message:"Invalid email"
                }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const isEmailRegistered = await User.findOne({ email});

        if (isEmailRegistered) {
            res.status(400).json(
                {
                    msg: "Email is already used"
                }
            );
            return;
        }

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json(
            {
                msg: "User registered successfully"
            }
        )

    } catch (error) {
        res.status(400).json(
            {
                msg: "Failed to register user"
            }
        )
    }
}

const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                msg: "Email and password are required"
            })
        }




        const user = await User.findOne({ email });


        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        }


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid password"
            })
        }


        const token = jwt.sign(   //Create token
            {
                id: user._id,
                email: user.email,
                name:user.name
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "50d"
            }
        )


        res.status(200).json({
            msg: "Login Succesful",
            token
        })

    } catch (error) {

        res.status(500).json({
            msg: error.message
        })

    }

}

const deleteUser = async (req, res) => {
    try {

        const {id} = req.params;

        const deleteUser = await User.findByIdAndDelete(id);

        if(!deleteUser){
            return res.status(404).json({
                "msg":"User not found"
            })
        }

        return res.status(200).json({
            "msg":"User deleted successfully"
        })

    } catch (error) {
        return res.status(400).json({
            msg: "Failed"
        })
    }
}

const getUserDeatils = async (req, res) => {

    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        return res.status(200).json({
            "msg": "Success",
            user: {
                user_name: user.name,
                email: user.email
            }
        })

    } catch (error) {
        return res.status(400).json({
            "msg": "Error"
        })
    }
}

const updateUserDetails = async (req, res) => {

    try {

        const userId = req.params.id;

        const user = await User.findByIdAndUpdate(
            userId,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )

        return res.status(200).json({
            msg: "Success",
            updatedUser: req.body
        })


    } catch (error) {
        return res.status(400).json({
            msg: "Failed"
        })
    }

}


module.exports = { registerUser, login, deleteUser, getUserDeatils, updateUserDetails }