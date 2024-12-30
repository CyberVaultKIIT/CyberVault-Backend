const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  infoObject: {
    type: mongoose.Schema.Types.Mixed, 
    required: true,
  },
  controllerObject: {
    type: mongoose.Schema.Types.Mixed,
    required: true, 
  },
  topicObject: {
    type: mongoose.Schema.Types.Mixed, 
  },
  sections: {
    type: [mongoose.Schema.Types.Mixed],
    required: true, 
  },
  requiredSection:{
    type: [mongoose.Schema.Types.Mixed],
  },
  optional: {
    type: mongoose.Schema.Types.Mixed,
    default: null 
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
