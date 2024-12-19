const express = require('express');
const router = express.Router();
const {checkAccess}= require('../middleware/checkAccess.js') 
const {verifyToken}= require('../middleware/verifyToken.js')
//const registrationController = require('../controllers/registrationController');
const {createForm}=require('../controllers/Form/createFormController.js')
const {deleteForm}=require('../controllers/Form/deleteFormController.js')
const {updateForm}=require('../controllers/Form/updateFormController.js')

//router.post('/saveResponse', registrationController.saveResponse);
router.use(verifyToken, checkAccess('admin'))
router.post('/createForm',  createForm) 
router.delete('/deleteForm', deleteForm)
router.put('/updateForm', updateForm)
// Additional routes can be added here

module.exports = router;
