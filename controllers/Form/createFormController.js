const Form = require("../../models/Form");

const createForm = async (req, res) => {
  try {
    const {
      infoObject,
      controllerObject,
      topicObject,
      sections,
      requiredSection,
      optional,
      isEventForm,
      eventInfo,
    } = req.body;

    const parseJSON = (data) => {
      if (!data) return null;

      if (typeof data === "object" && !Array.isArray(data)) return data;

      if (Array.isArray(data) && data.length === 1 && typeof data[0] === "string") {
        try {
          return JSON.parse(data[0]);
        } catch {
          return data;
        }
      }

      if (typeof data === "string") {
        try {
          return JSON.parse(data);
        } catch {
          return data;
        }
      }

      return data;
    };

    const parsedInfoObject = parseJSON(infoObject);
    const parsedControllerObject = parseJSON(controllerObject);
    const parsedTopicObject = parseJSON(topicObject);
    const parsedSections = parseJSON(sections);
    const parsedRequiredSection = parseJSON(requiredSection);
    const parsedOptional = parseJSON(optional);

    let finalOptional = parsedOptional || {};

    if (isEventForm === "true" && eventInfo) {
      const parsedEventInfo = parseJSON(eventInfo);
      finalOptional.isEventForm = true;
      finalOptional.eventInfo = parsedEventInfo;

      if (req.files && req.files.length > 0) {
        if (!finalOptional.eventInfo.images) {
          finalOptional.eventInfo.images = [];
        }

        const uploadedImages = req.files.map((file) => ({
          url: file.path,
          publicId: file.filename,
          originalName: file.originalname,
        }));

        finalOptional.eventInfo.images = uploadedImages;
      }
    } else if (req.files && req.files.length > 0 && parsedInfoObject) {
      if (!parsedInfoObject.eventPoster) {
        parsedInfoObject.eventPoster = {};
      }

      req.files.forEach((file, index) => {
        parsedInfoObject.eventPoster[`image${index + 1}`] = file.path;
      });
    }

    const newForm = new Form({
      infoObject: parsedInfoObject,
      controllerObject: parsedControllerObject,
      topicObject: parsedTopicObject,
      sections: parsedSections,
      requiredSection: parsedRequiredSection,
      optional: finalOptional,
    });

    const savedForm = await newForm.save();

    res.status(201).json({
      message: "Form created successfully",
      form: savedForm,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating form",
      error: error.message,
    });
  }
};

module.exports = { createForm };
