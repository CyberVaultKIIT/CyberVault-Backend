const express = require("express");
const router = express.Router();
const registrationController = require("../controllers/registrationController");
const { createForm } = require("../controllers/Form/createFormController.js");
const { deleteForm } = require("../controllers/Form/deleteFormController.js");
const { updateForm } = require("../controllers/Form/updateFormController.js");
const multer = require("multer");
const { storage } = require("../cloudinary/config.js");
const upload = multer({ storage });
const catchAsync = require("../utils/catchAsyncError.js");
const eventController = require("../controllers/Event/eventController.js");

const folder = (name) => (req, res, next) => {
  req.folder = name;
  next();
};

router.get("/events", eventController.getActiveEvents);
router.get("/events/all", eventController.getAllEvents);
router.get("/events/:eventId", eventController.getEventById);
router.get("/events/:eventId/structure", eventController.getEventFormStructure);

// router.post('/saveResponse', registrationController.saveResponse);
router
  .route("/formSubmissions/:formId")
  .get(catchAsync(registrationController.getForm))
  .post(
    folder("submissions"),
    upload.array("image", 10),
    catchAsync(registrationController.saveResponse)
  );

// router.use(verifyToken, checkAccess("admin"));
router.post(
  "/createForm",
  folder("events"),
  upload.array("eventImages", 10),
  createForm
);
router.delete("/deleteForm/:formId", deleteForm);
router.put("/updateForm/:formId", updateForm);
// Additional routes can be added here

module.exports = router;
