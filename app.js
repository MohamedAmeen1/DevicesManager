const express = require('express');
const bodyParser = require('body-parser')
require('./models/db')
let cors = require('cors')

const user_router = require('./routes/user')
const device_router = require('./routes/device')
const auth = require('./middleware/auth')
const app =express();
const expressSwagger = require('express-swagger-generator')(app);
const morgan = require('morgan')
const swaggerOptions=require('./config/swagger')
expressSwagger(swaggerOptions)
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(cors())
app.use('/user',user_router)
app.use('/device',auth,device_router)



const server =app.listen(process.env.PORT||4000,()=>{
    console.log('server is running port : 4000')
})