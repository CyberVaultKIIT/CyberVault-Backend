const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  Info_object: {
    type: mongoose.Schema.Types.Mixed, 
    required: true,
  },
  Controller_object: {
    type: mongoose.Schema.Types.Mixed,
    required: true, 
  },
  Topic_object: {
    type: Object, 
  },
  Sections: {
    type: [mongoose.Schema.Types.Mixed],
    required: true, 
  },
  requiredSection:{
    type: [mongoose.Schema.Types.Mixed],
  },
  Optional: {
    type: mongoose.Schema.Types.Mixed,
    default: null 
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
