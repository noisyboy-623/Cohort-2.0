import userModel from "../models/user.model.js";
import { config } from '../config/config.js'
import jwt from "jsonwebtoken"

async function sendTokenResponse(user, res, message) {
    
    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("Token", token)

    res.status(200).json({
        message,
        success:true,
        user:{
            id: user._id,
            email: user.email,
            contact: user.contact,
            name: user.name,
            role: user.role
        }
    })
}

export const registerController = async (req, res) => {
    const { email, password, name, contact, isSeller } = req.body;

    try{
        const existingUser = await userModel.findOne({
            $or: [
                { email },
                { contact}
            ]
        })
        if(existingUser){
            return res.status(400).json({
                message: "User with this email or contact already exists"
            })
        }

        const user = await userModel.create({
            email,
            contact,
            name,
            password,
            role: isSeller? "seller" : "buyer"
        })

        await sendTokenResponse(user, res, "User registered successfully")
    } catch(error){
        console.log(error)
        return res.status(500).json({ 
            message: "Internal server error"
        })
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isMatch = user.comparePassword(password)

    if(!isMatch){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

     await sendTokenResponse(user, res, "User logged-in successfully")
}

export const googleCallback = async (req, res) => {
    const { id, displayName, emails, photos } = req.user

    const email = emails[0].value
    const profilePic = photos[0].value

    let user = await userModel.findOne({
       email 
    })

    if(!user){
        user = await userModel.create({
            email,
            googleId: id,
            name: displayName
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, config.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie('Token', token)

    res.redirect("http://localhost:5173")
}

export const getMeController = async (req, res) => {
    const user = req.user

    res.status(200).json({
        message: "User fetched succeessfully",
        success: true,
        user: {
            id:user._id,
            name: user.name,
            email: user.email,
            contact: user.contact,
            role: user.role
        }
    })
}