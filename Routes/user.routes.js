const express = require("express");
const {userModel}  = require("../Model/userModel.js")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
 const userRouter = express.Router()
 
 userRouter.post("/register",async(req,res)=>{

    const {email,name,password,isAdmin} = req.body;
    try {
        bcrypt.hash(password,5,async(err,secure_password)=>{
            if(err){
                console.log(err)
            }
            else{
                const user = new userModel({email,password:secure_password,name,isAdmin})
                await user.save()
                res.send({"msg":"new user registered"})
            }
        })
    } catch (error) {
        console.log(error)
        res.send({"err":"error adding user"})
    }
    
 })

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    
    try {
        const user = await userModel.find({email});
        const hashed_pass = user[0].password;
        
        if(user.length>0){
            bcrypt.compare(password,hashed_pass,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id},process.env.key)
                    res.send({"msg":"login successful","token":token})
                }
                else{
                    res.send({"msg":"Wrong credentials"})
                }
            });
        }
        else{
            res.send({"msg":"wrong credentials"})
        }
    } catch (error) {
        res.send({"err":"Something went wrong"})
        console.log(error)
    }
})
 

 module.exports = {
    userRouter
 }