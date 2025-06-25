import mongoose from "mongoose"

const connect_db = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB_CONNECTED SUCCESSFULY...🎊🎊🎊")
    } catch (error) {
        console.log(error,"...⚠️⚠️")
    }
}



export default connect_db