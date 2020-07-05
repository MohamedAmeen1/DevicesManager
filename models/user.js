const mongoose = require("mongoose");

const userSchema =new mongoose.Schema({
    name: {
        type: String,
    },
email: {
        type: String,
    },
phone:{
        type: String,
    },
password: {
        type: String,
        required: true ,
        required: 'password is required'   
    },
status:{
        type:Number,
        default:0
    },
code:{
        type:String
    },
})

module.exports.user =mongoose.model("user", userSchema)
