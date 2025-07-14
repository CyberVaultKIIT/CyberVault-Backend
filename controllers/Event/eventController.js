const Form = require("../../models/Form");

const getActiveEvents = async (req, res) => {
  try {
    const events = await Form.find({
      $or: [
        { "optional.isEventForm": true },
        { "optional.eventInfo": { $exists: true } },
        { "infoObject.eventPoster": { $exists: true } },
        { "controllerObject.isLive": true },
      ],
    }).sort({ createdAt: -1 });

    const activeEvents = events
      .map((form) => {
        const eventInfo = form.optional?.eventInfo || {};
        const eventDate = eventInfo?.date ? new Date(eventInfo.date) : null;
        const isFutureEvent = eventDate && eventDate >= new Date();

        const isActive =
          (form.controllerObject?.isLive && !form.controllerObject?.isPast) ||
          (eventInfo?.isActive && isFutureEvent);

        if (!isActive) return null;

        return {
          id: form._id,
          title: form.infoObject?.formTitle || "Untitled",
          description: form.infoObject?.description || "",
          poster: { images: form.infoObject?.eventPoster || {} },
          topic: form.topicObject?.topic || "",
          isLive: form.controllerObject?.isLive || false,
          createdAt: form.createdAt,
          updatedAt: form.updatedAt,
          eventInfo: {
            title: eventInfo.title,
            date: eventInfo.date,
            location: eventInfo.location,
            registrationDeadline: eventInfo.registrationDeadline,
            ticketPrice: eventInfo.ticketPrice,
            venue: eventInfo.venue,
          },
          images: eventInfo.images || [],
        };
      })
      .filter(Boolean);

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
    const events = await Form.find({}).sort({ createdAt: -1 });

    const allEvents = events.map((form) => ({
      id: form._id,
      title: form.infoObject?.formTitle || "Untitled",
      description: form.infoObject?.description || "",
      topic: form.topicObject?.topic || "",
      poster: form.infoObject?.eventPoster || {},
      isLive: form.controllerObject?.isLive || false,
      isPast: form.controllerObject?.isPast || false,
      eventInfo: form.optional?.eventInfo || null,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    }));

    res.status(200).json({
      success: true,
      count: allEvents.length,
      events: allEvents,
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
    const { eventId } = req.params;
    const form = await Form.findById(eventId);

    if (!form) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    const eventInfo = form.optional?.eventInfo || {};

    const eventDetails = {
      id: form._id,
      title: form.infoObject?.formTitle || "Untitled",
      description: form.infoObject?.description || "",
      poster: form.infoObject?.eventPoster || {},
      topic: form.topicObject?.topic || "",
      isLive: form.controllerObject?.isLive || false,
      isPast: form.controllerObject?.isPast || false,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
      eventInfo: {
        title: eventInfo.title,
        date: eventInfo.date,
        location: eventInfo.location,
        registrationDeadline: eventInfo.registrationDeadline,
        ticketPrice: eventInfo.ticketPrice,
        venue: eventInfo.venue,
        images: eventInfo.images || [],
      },
    };

    res.status(200).json({
      success: true,
      event: eventDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
    });
  }
};

const getEventFormStructure = async (req, res) => {
  try {
    const { eventId } = req.params;
    const form = await Form.findById(eventId);

    if (!form) {
      return res
        .status(404)
        .json({ success: false, message: "Form not found" });
    }

    const structure = {
      id: form._id,
      title: form.infoObject?.formTitle || "Untitled",
      description: form.infoObject?.description || "",
      isLive: form.controllerObject?.isLive || false,
      sections:
        form.sections?.map((section) => ({
          title: section.sectionTitle,
          fields: section.fields?.map((field) => ({
            name: field.fieldName,
            type: field.type,
            label: field.label,
            placeholder: field.placeholder || "",
            required: field.required || false,
            options: field.options || [],
            validation: field.validation || {},
          })),
        })) || [],
      requiredSections: form.requiredSection || [],
      eventInfo: form.optional?.eventInfo || null,
    };

    res.status(200).json({
      success: true,
      form: structure,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch form structure",
    });
  }
};

module.exports = {
  getActiveEvents,
  getAllEvents,
  getEventById,
  getEventFormStructure,
};
