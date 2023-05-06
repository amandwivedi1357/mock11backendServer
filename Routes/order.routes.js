const express = require("express")
const { orderModel } = require("../Model/orderModel")
const orderRouter = express.Router()

orderRouter.get("/",async(req,res)=>{
    const orders = await orderModel.find();
    res.send(orders)
})


orderRouter.post("/order",async(req,res)=>{
    const payload = req.body;
    const order = new orderModel(payload)
    order.save()
    res.send({"msg":"order placed"})
})

module.exports = {
    orderRouter
}