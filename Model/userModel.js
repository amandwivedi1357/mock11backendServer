const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    
    name: String,
    email: String,
    password: String,
    isAdmin: Boolean
      
},{versionKey:false})

const userModel = mongoose.model("user",userSchema)
module.exports = {
    userModel
}