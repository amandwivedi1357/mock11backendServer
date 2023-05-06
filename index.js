const express = require("express")
const app = express();
require("dotenv").config()
const {userRouter} = require("./Routes/user.routes")
const {authenticate}  = require("./Middlewares/authenticae.middleware")
const {connection}  = require("./Config/db");
const { bookRouter } = require("./Routes/books.routes");

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HomePage")
})

app.use("/users",userRouter)
app.use(authenticate)
app.use("/books",bookRouter)
app.listen(8080,async()=>{
    try {
        await connection;
        console.log("connected to the db")

    } catch (error) {
        console.log("error connecting to the db",error)
    }
    console.log(`port is running at ${process.env.port}`)
})





