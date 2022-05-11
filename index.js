import express, {json} from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import chalk from 'chalk'
import authRouter from "./routes/authRoute.js"


//express 
const app = express()
app.use(cors())
app.use(json())

//dotenv 
dotenv.config()

// routes
app.use(authRouter)

const port = process.env.PORT
app.listen(port, () => {
    console.log(chalk.bold.green(`Server is running on port ${port}.`))
})
