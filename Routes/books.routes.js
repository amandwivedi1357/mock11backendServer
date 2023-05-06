const express = require("express")
const { bookModel } = require("../Model/bookModel")
const bookRouter = express.Router()

bookRouter.get("/",async(req,res)=>{
    const books = await bookModel.find();
    res.send(books)
})

bookRouter.get("/:id",async(req,res)=>{
    const bookId = req.params.id
    const book = await bookModel.findById(bookId)
    res.send(book)
})

bookRouter.post("/add",async(req,res)=>{
    const payload = req.body;
    const book = new bookModel(payload)
    book.save()
    res.send({"msg":"book added"})

})

bookRouter.delete("/delete/:id",async(req,res)=>{
    const bookId = req.params.id;
    await bookModel.findByIdAndDelete({_id:bookId})
    res.send({"msg":`book with id ${bookId} deleted`})
})

bookRouter.patch("/update/:id",(req,res)=>{
    res.send("update books")
})

module.exports = {
    bookRouter
}