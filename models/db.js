const mongoose =require('mongoose')
require('dotenv').config()


let db=mongoose.connect(process.env.MongoDBO,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology: true},(err)=>{
    if(!err)
    {
        console.log('DB connected successfully')
    }
    else
    console.log('error in connecting to db '+err.message)
})
module.exports=db