import userModel from "../models/user.model";
import { config } from '../config/config.js'

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
        }
    })
}

export const registerController = async (req, res) => {
    const { email, password, name, contact } = req.body;

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

        sendTokenResponse(user, res, "User registered successfully")
    } catch(error){
        console.log(error)
        return res.status(500).json({ 
            message: "Internal server error"
        })
    }
}