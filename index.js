import express, {json} from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import chalk from 'chalk'

import authRouter from "./routes/authRoute.js"
import productsRoute from "./routes/productsRoute.js"
import cartsRoute from "./routes/cartsRoute.js"
import paymentRoute from "./routes/paymentRoute.js"

//express 
const app = express()
app.use(cors())
app.use(json())

//dotenv 
dotenv.config()

// routes
app.use(authRouter)
app.use(productsRoute)
app.use(cartsRoute)
app.use(paymentRoute)

const port = process.env.PORT
app.listen(port, () => {
    console.log(chalk.bold.green(`Server is running on port ${port}.`))
})
