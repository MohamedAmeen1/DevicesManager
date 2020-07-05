const mongoose = require("mongoose");

const deviceSchema =new mongoose.Schema({
    name: {
        type: String,
    },
    model: {
        type: String,
    },
    description:{
        type:String
    },
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'user'
    }
})

module.exports.device =mongoose.model("device", deviceSchema)
