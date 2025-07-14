const express = require("express");
const router = express.Router();
const registrationController = require('../controllers/registrationController');
const { createForm } = require("../controllers/Form/createFormController.js");
const { deleteForm } = require("../controllers/Form/deleteFormController.js");
const { updateForm } = require("../controllers/Form/updateFormController.js");
const multer = require("multer");
const { storage } = require('../cloudinary/config.js');
const upload = multer({ storage });
const catchAsync = require("../utils/catchAsyncError.js");

// router.post('/saveResponse', registrationController.saveResponse);
router.route("/:formId").get(catchAsync(registrationController.getForm)).post(upload.array("image"),catchAsync(registrationController.saveResponse));

router.use(verifyToken, checkAccess('admin'))
router.post("/createForm", createForm);
router.delete("/deleteForm/:formId", deleteForm);
router.put("/updateForm/:formId", updateForm);
// Additional routes can be added here

module.exports = router;
