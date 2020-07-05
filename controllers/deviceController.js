const express = require('express')
const Joi = require('joi')
const mongoose = require('mongoose')
const lodash = require('lodash')
const bcrypt = require('bcryptjs');
const { device } = require('../models/device')
const helper = require('../helper')
const deviceRepository = require('../repository/deviceRepository')
const jwt=require('jsonwebtoken')

module.exports.createdevice = async function (req, res) {
    let schema = deviceRepository.addDeviceSchema()
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send({ status: 400, message: error.details[0].message })

    try {
        req.body.owner=req.user_id
        new device(req.body).save(async (err, device)=> {
            if (err || !device) {
                return res.status(400).send({
                    status: 400,
                    err: err,
                    message: "Error In Creating Device"
                })
            }
            else {
                return res.send({
                    status: 200,
                    message: "device Created Successfully",
                    device:device
                })
            }
        })
    } catch (error) {
        return res.status(400).send({
            status: 400,
            err: error.message,
            message: "Error In Creating Device"
        })
    }
}
module.exports.editdevice = async function (req, res) {
    let schema = deviceRepository.editDeviceSchema()
    const { error } = Joi.validate(req.body, schema);
    if (error) return res.status(400).send({ status: 400, message: error.details[0].message })

    try {
        device.findByIdAndUpdate(req.body.id,lodash.pick(req.body,['model','name','description']),async (err, device)=> {
            if (err || !device) {
                return res.status(400).send({
                    status: 400,
                    err: err,
                    message: "Error In editing Device"
                })
            }
            else {
                return res.send({
                    status: 200,
                    message: "device updated Successfully",
                    device:device
                })
            }
        })
    } catch (error) {
        return res.status(400).send({
            status: 400,
            err: error.message,
            message: "Error In editing Device"
        })
    }
}
module.exports.getdevices = function (req, res) {
    try {
        device.find({ 'owner': req.user_id }, async (err, devices) => {
            if (err || !devices) {
                console.log(devices)
                return res.status(400).send({
                    status: 400,
                    message: "Error In Geting Devices"
                })
            }
            else {
                return res.send({
                    status: 200,
                    devices: devices
                })

            }
        })
    } catch (error) {
        console.log(error)
        return res.send({
            status: 400,
            message: "Error In Geting Devices"
        })
    }
}
module.exports.getdevicebyid = function (req, res) {
    let schema = deviceRepository.idSchema()
    const { error } = Joi.validate(req.query, schema);
    if (error) return res.status(400).send({ status: 400, message: error.details[0].message })
    try {
        device.find({'_id':req.query.id,'owner': req.user_id }, async (err, device) => {
            if (err || !device) {
                console.log(device)
                return res.status(400).send({
                    status: 400,
                    message: "Error In Geting Device"
                })
            }
            else {
                return res.send({
                    status: 200,
                    device: device
                })

            }
        })
    } catch (error) {
        console.log(error)
        return res.send({
            status: 400,
            message: "Error In Geting Device"
        })
    }
}