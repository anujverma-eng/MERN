import express from 'express'
import userRoute from "./routes/user.js"
import { connectDB } from './utils/features.js'
import { errorMiddleWare } from './middlewares/error.js'

const app = express()

const PORT = 4000

connectDB()

app.use(express.json())


app.get("/",(req, res)=>{
  res.send("API's are working fine")
})

app.use("/api/v1/user",userRoute)


app.use(errorMiddleWare)

app.listen(PORT,()=>{
  console.log(`Server is listening on http://localhost:${PORT}`)
})