import express from 'express';
import dotenv from "dotenv"
import productRoutes from './routes/product.route.js'
import connectDB from "./config/db.js"

dotenv.config()
const app = express()

app.use(express.json())

app.use("/api/products", productRoutes)

app.listen(5000, ()=>{
    connectDB()
    console.log(`Server is running on port ${process.env.PORT || 5000}`)
})