const express = require('express')
const Joi = require('joi')
const mongoose = require('mongoose')
const lodash = require('lodash')
const bcrypt = require('bcryptjs');
const { user } = require('../models/user')
const helper = require('../helper')
const userRepository = require('../repository/userRepository')
const jwt=require('jsonwebtoken')
module.exports.addUser = async function (req, res) {
    let schema = userRepository.addUserSchema()
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send({ status: 400, message: error.details[0].message })

    try {
        const userEmailFound = await user.findOne({ 'email': req.body.email, 'status': 1 })
        if (userEmailFound) return res.status(400).send({ status: 400, message: "This Email Is Taken" })

        let cipher_pass = await helper.encrypt(req.body.password)
        req.body.password = cipher_pass

        let random_key = Math.floor(Math.random() * 900000) + 100000
        let random_key2 = Math.floor(Math.random() * 900000) + 100000
        let code = random_key + req.body.email + random_key2
        req.body.code = code

        user.findOneAndUpdate({ 'email': req.body.email, 'status': 0 }, req.body, { upsert: true }, (err, user) => {
            if (err || !user) {
                return res.status(400).send({
                    status: 400,
                    err: err,
                    message: "Error In Creating User"
                })
            }
            else {
                helper.send_verification_email(code, req.body.email)
                return res.send({
                    status: 200,
                    message: "verification email has been sent"
                })
            }
        })
    } catch (error) {
        return res.status(400).send({
            status: 400,
            err: error.message,
            message: "Error In Creating User"
        })
    }
}

module.exports.activeemail = async function (req, res) {
    let email = req.params.code.substring(6, req.params.code.length - 6)
    let random_key = Math.random().toString(36).substring(7);
    try {
        user.findOneAndUpdate({ code: req.params.code }, { 'status': 1, code: random_key }, async (err, user) => {
            if (err || !user) {
                return res.status(400).send("Can't Verify Email")
            }
            else {
                return res.send("Email Verified Successfully Go and Signin !")
            }
        })
    } catch (error) {
        return res.status(400).send({
            status: 400,
            err: error.message,
            message: "Can't Verify Email"
        })
    }
}
module.exports.signin = function (req, res) {
    let schema = userRepository.SigninSchema()
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send({ status: 400, message: error.details[0].message })
    try {
        user.findOne({'email': req.body.email}, async (err, res_user) => {
            if (err || !res_user) {
                return res.status(400).send({
                    status: 400,
                    message: "Log In failed. A user with this email address doesn't exist"
                })
            }
            else {
                const valid = await bcrypt.compare(req.body.password, res_user.password);
                if (!valid) return res.status(400).send({
                    status: 400,
                    message: "Wrong Password"
                })
                if (res_user.status == 0) {
                    return res.status(400).send({
                        status: 400,
                        message: "Your Account Is Not Verified Yet"
                    })
                }
                let random_key = Math.random().toString(36).substring(7);
                let token = jwt.sign({ id: res_user._id, key: random_key }, process.env.user_private_key)
                return res.send({
                    "authToken": token,
                    status: 200,
                    user: lodash.pick(res_user, ['_id', 'name', 'email', 'phone'])
                })

            }
        })
    } catch (error) {
        return res.send({
            status: 400,
            message: "Log In failed. Please try again later"
        })
    }
}