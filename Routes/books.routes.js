const express = require("express")
const bookRouter = express.Router()

bookRouter.get("/",(req,res)=>{
    res.send("all the routes")
})

bookRouter.post("/add",(req,res)=>{
    res.send("upload book")
})

bookRouter.delete("/delete",(req,res)=>{
    res.send("delete book")
})

bookRouter.patch("/update/:id",(req,res)=>{
    res.send("update books")
})

module.exports = {
    bookRouter
}