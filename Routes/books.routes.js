const express = require("express")
const { bookModel } = require("../Model/bookModel")
const bookRouter = express.Router()

bookRouter.get("/",async(req,res)=>{
    

    const {category,author}=req.query ;
    let query={} ;
    if(category){
        query.category=category;
}
if(author){
    query.author=author;
}
try{
    const book=await bookModel.find(query);
    res.send(book)
}catch(err){
    res.send({msg:err.message})
}
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

bookRouter.patch("/update/:id",async(req,res)=>{
    let id = req.params.id;
    try {
        await bookModel.findByIdAndUpdate({"_id":id},req.body)
        res.send(`the book with id ${id} has been updated `)
    } catch (error) {
        console.log(error)
        res.send({"err":"something went wrong"})
    }
})

module.exports = {
    bookRouter
}


// "title": "unknown",
//         "author": "gudiya",
//         "category": "romantic",
//         "price": 1000,
//         "quantity": 1