const Joi =require('joi')
const userRepository = {
    addUserSchema: function () {
        let schema = {
            email: Joi.string().email().required(),
            name: Joi.string().min(3).max(30).required(),
            password: Joi.string().required(),
            phone: Joi.string().regex(/^[0-9]+$/).min(9).max(20).required()
        }
        return schema
    },
    SigninSchema: function () {
        let schema = {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }
        return schema
    },
}

module.exports = userRepository;