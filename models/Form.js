const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  Form_id: {
    type: String,
    required: true,
    unique: true,
  },
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
  },
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
