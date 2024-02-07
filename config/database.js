import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async() => {
    try {

        const connect = mongoose.connect(process.env.DB_URL)

        console.log(`DB Connected`)

    } catch (err) {

        console.log('Error while Connecting with Database')
    }
}

export default connectDB