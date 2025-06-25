import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import cookie from "cookie-parser"
export const signup = async (req,res) => {
    try {
    
        const {name,email,password} = req.body
        

        const existEmail = await User.findOne({email})
        if(!name){
            return res.status(400).json({message:"Name must be required!!"})
        }
        if(existEmail){
            return res.status(400).json({message:"email already exists!!!"})
        }
       
        if(password.length < 6)
        {
            return res.status(400).json({message:"Password length atleast 6 character"})
        }

        const hashedPassword = await bcrypt.hash(password,10)


        const user  = await User.create({
            name,
            password:hashedPassword,
            email
        })


        const token = await genToken(user._id)
        console.log("token ->>>",token)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:true,
        })
           
        return res.status(200).json(user)



    } catch (error) {
        return res.status(500).json({message:`Sign-Up Error...${error}`})
    }
}


export const login = async (req,res) => {

       try {

           const {email,password} = req.body;

        if(!password, !email)
        {
            return res.status(400).json({message:"email and password both are required..."})
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"email not found"});

        }

        const isMatch  = await bcrypt.compare(password,user.password)

            if(!isMatch)
            {
                return res.status(400).json({message:"password Wrong"})
            }

            const token = await genToken(user._id);

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
            secure:true,
        })
           
        return res.status(200).json(user)

       } catch (error) {
        return res.status(500).json({message:`Login Error ${error}`});
       }

}


export const logout = async (req,res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Log Out"})
    } catch (error) {
        return res.status(400).json({message:`Log Out error ${error}`});
    }
}
