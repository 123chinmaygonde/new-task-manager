const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./Db/ConnectDB")
const router = require('./controller/Routes')
dotenv.config()
const app = express()
connectDB()
app.use(express.json())
app.use(cors())

app.use('/api/tasks',router)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})