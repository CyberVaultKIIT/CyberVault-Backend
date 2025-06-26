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

      if (
        Array.isArray(data) &&
        data.length === 1 &&
        typeof data[0] === "string"
      ) {
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

    console.log("Files received:", req.files.length, req.files.map(f => f.originalname));

    const parsedInfoObject = parseJSON(infoObject);
    const parsedControllerObject = parseJSON(controllerObject);
    const parsedTopicObject = parseJSON(topicObject);
    const parsedSections = parseJSON(sections);
    const parsedRequiredSection = parseJSON(requiredSection);
    const parsedOptional = parseJSON(optional);

    let finalOptional = parsedOptional || {};

    if (isEventForm === "true" && eventInfo) {
      finalOptional.isEventForm = true;
      finalOptional.eventInfo = parseJSON(eventInfo) || {};

      if (req.files?.length) {
        finalOptional.eventInfo.images = req.files.map((f) => ({
          url: f.path,
          publicId: f.filename,
          originalName: f.originalname,
        }));
      }
    } else if (req.files?.length && parsedInfoObject) {
      parsedInfoObject.eventPoster ??= {};
      req.files.forEach((f, i) => {
        parsedInfoObject.eventPoster[`image${i + 1}`] = f.path;
      });
    }

    const savedForm = await new Form({
      infoObject: parsedInfoObject,
      controllerObject: parsedControllerObject,
      topicObject: parsedTopicObject,
      sections: parsedSections,
      requiredSection: parsedRequiredSection,
      optional: finalOptional,
    }).save();

    res
      .status(201)
      .json({ message: "Form created successfully", form: savedForm });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating form", error: err.message });
  }
};

module.exports = { createForm };
