const mongoose = require("mongoose");

const eventInfoSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    date: {
        type: Date 
    },
    location: { 
        type: String 
    },
    registrationDeadline: { 
        type: Date 
    },
    ticketPrice: { 
        type: Number 
    },
    venue: { 
        type: String 
    },
    images: { 
        type: [String], default: [] 
    },
});

const eventSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    topic: { 
        type: String 
    },
    poster: { 
        type: mongoose.Schema.Types.Mixed, 
        default: {} 
    },
    isLive: { 
        type: Boolean, 
        default: false 
    },
    isPast: { 
        type: Boolean, 
        default: false 
    },
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form"
    },
    eventInfo: { 
        type: eventInfoSchema 
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
