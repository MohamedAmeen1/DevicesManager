require('dotenv').config()

let options = {
    swaggerDefinition: {
        info: {
            description: 'Devices manager api docs',
            title: 'Devices manager',
            version: '1.0.0',
        },
        host: process.env.swaggerurl+'/',
        basePath: '',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https'],
        securityDefinitions: {
            JWT: {
                type: 'apiKey',
                in: 'header',
                name: 'authToken',
                description: "the token",
            }
        }
    },
    basedir: __dirname, //app absolute path
    files: ['../routes/*.js'] //Path to the API handle folder
};
module.exports=options