import { express } from "express"
import dotenv from 'dotenv'

//dotenv 
dotenv.config()

//express 
const app = express()
app.use(cors())
app.use(json())
app.listen(process.env.PORT, () => {
    console.log(chalk.bold.green('Express:UOl online : porta 5000'))
})
