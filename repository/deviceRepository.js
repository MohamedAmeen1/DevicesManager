const Joi = require('joi')
const deviceRepository = {
    addDeviceSchema: function () {
        let schema = {
            model: Joi.string().required(),
            name: Joi.string().min(3).max(30).required(),
            description: Joi.string().required(),
        }
        return schema
    },
    editDeviceSchema: function () {
        let schema = {
            id: Joi.string().length(24).required(),
            model: Joi.string(),
            name: Joi.string().min(3).max(30),
            description: Joi.string(),
        }
        return schema
    },
    idSchema: function () {
        let schema = {
            id: Joi.string().length(24).required(),
        }
        return schema
    },
}

module.exports = deviceRepository;