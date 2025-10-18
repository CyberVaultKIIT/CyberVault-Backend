const Event = require("../../models/Event");

const getActiveEvents = async (req, res) => {
  try {
    const activeEvents = await Event.find({isLive: true}).sort({ createdAt: -1 });

    if(!activeEvents){
      return res.status(404)
      .json({message: "No active events found"})
    }

    res.status(200).json({
      success: true,
      count: activeEvents.length,
      events: activeEvents,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch active events",
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 });

     if(!events){
      return res.status(404)
      .json({message: "No events found"})
    }

    res.status(200).json({
      success: true,
      count: events.length,
      events: events,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch all events",
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const {id} = req.params;
    const event = await Event.findOne({_id : id });

    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      event: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
    });
  }
};

// const getEventFormStructure = async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const form = await Form.findById(eventId);

//     if (!form) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Form not found" });
//     }

//     const structure = {
//       id: form._id,
//       title: form.infoObject?.formTitle || "Untitled",
//       description: form.infoObject?.description || "",
//       isLive: form.controllerObject?.isLive || false,
//       sections:
//         form.sections?.map((section) => ({
//           title: section.sectionTitle,
//           fields: section.fields?.map((field) => ({
//             name: field.fieldName,
//             type: field.type,
//             label: field.label,
//             placeholder: field.placeholder || "",
//             required: field.required || false,
//             options: field.options || [],
//             validation: field.validation || {},
//           })),
//         })) || [],
//       requiredSections: form.requiredSection || [],
//       eventInfo: form.optional?.eventInfo || null,
//     };

//     res.status(200).json({
//       success: true,
//       form: structure,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch form structure",
//     });
//   }
// };

module.exports = {
  getActiveEvents,
  getAllEvents,
  getEventById,
  // getEventFormStructure,
};
