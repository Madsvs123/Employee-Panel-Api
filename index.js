import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import connectDB from './config/database.js'
import EmployeeRoute from './routes/employee.js'
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import { vertifyToken } from './middleware/vertifyToken.js'


dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 6001

const app = express()

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit : "30mb" , extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb" , extended : true}));
app.use(cors())

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/employee', EmployeeRoute)

connectDB()
app.listen(PORT, (err) => {
    if(!err) {
        console.log(`Listen To Port ${PORT}`)
    }
})