const jwt = require("jsonwebtoken")
require("dotenv").config()

const authenticate = (req,res,next)=>{
const token = req.headers.authorization;
if(token){
    const decoded = jwt.verify(token,process.env.key);
    if(decoded){
        const userID = decoded.userID;
        console.log(decoded)
        req.body.userID = userID;
        next();
    }
    else{
        res.send("Please login first");
    }
}
else{
    res.send("Please Login first")
}
}

module.exports = {authenticate}