import { app } from "./app.js"
import { connectDB } from "./data/database.js";


connectDB()
console.log(process.env.PORT)

app.listen(5000,(req,res)=>{
    console.log(`Server is Working port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`)
})