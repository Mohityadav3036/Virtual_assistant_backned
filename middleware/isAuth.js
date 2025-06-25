import jwt from "jsonwebtoken"
const isAuth = async (req,res,next) => {
    
    try {
        
        const token  = req.cookies.token
           console.log("Received token:", token)    
        if(!token){
            return res.status(400).json({message:"token not found"})
        }
             if (!token || typeof token !== "string") {
            return res.status(400).json({ message: "Token not found or invalid" })
        }

        const verifyToken = await jwt.verify(token,process.env.JWT_SECRET) 
        req.userId=verifyToken.userId
        next()

    } catch (error) {
         console.log(error)
         return res.status(500).json({message:"is Auth Error"})
    }

}


export default isAuth