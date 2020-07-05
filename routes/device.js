const express =require('express')
const router=express.Router()
const deviceController=require('../controllers/deviceController')


router.post('/',deviceController.createdevice)
router.get('/getdevices',deviceController.getdevices)
router.get('/getdevicebyid',deviceController.getdevicebyid)
router.post('/editdevice',deviceController.editdevice)

module.exports=router;
/**
 * @typedef createDevice
 * @property {string} model.required
 * @property {string} name.required
 * @property {string} description.required
 */
/**
 * This function comment is parsed by doctrine
 * add new device
 * @route post /device/
 * @group devices - Operations about devices
 * @param {createDevice.model} device.body.required
 * @returns {object} 200 success -{  status:200,  message:"device Created Successfully" ,device:"Object"} 
 * @returns {object} 400 failed -{  status:400,  message:"Can't Create Device" } 
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
//-------------------------------------------------get devices--------------------------------------
/**
 * This function comment is parsed by doctrine
 * get devices
 * @route get /device/getdevices
 * @group devices - Operations about devices
 * @returns {object} 200 success -{  status:200 ,devices:"ListOfObjects"} 
 * @returns {object} 400 failed -{  status:400,  message:"Error In Geting Devices" } 
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
//-------------------------------------------------get device by id--------------------------------------
/**
 * This function comment is parsed by doctrine
 * get device by id
 * @route get /device/getdevicebyid
 * @group devices - Operations about devices
 * @param {string}  id.query.required
 * @returns {object} 200 success -{  status:200 ,device:"Objects"} 
 * @returns {object} 400 failed -{  status:400,  message:"Error In Geting Device" } 
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
//------------------------------------------------edit device--------------------------------------------
/**
 * @typedef editdevice
 * @property {string} id.required
 * @property {string} model
 * @property {string} name
 * @property {string} description
 */
/**
 * This function comment is parsed by doctrine
 * edit device
 * @route post /device/editdevice
 * @group devices - Operations about devices
 * @param {editdevice.model} device.body.required
 * @returns {object} 200 success -{  status:200,  message:"device updated Successfully" ,device:"Object"} 
 * @returns {object} 400 failed -{  status:400,  message:"Error In editing Device" } 
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */