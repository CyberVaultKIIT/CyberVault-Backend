
const Form = require('../../models/Form'); 




const deleteForm = async (req, res) =>{
  try {
    const { formId, isEventForm } = req.body;


    const deletedForm = await Form.findOneAndDelete({ _id: formId });
    if(isEventForm){
      const deletedEvent = await Event.findOneAndDelete({formId: formId});

      if(deletedForm && deletedEvent){
        res 
        .status(200)
        .json({message: "Form and event deleted successfully", form: deletedForm, event:deletedEvent})
      }
      else if(!deletedForm || !deletedEvent){
        return res.status(404).json({message:"Form or event not found"});

      }
    }

    else{
        if (!deletedForm ) {
          return res.status(404).json({ message: 'Form not found' });
        }
      res.status(200).json({ message: 'Form deleted successfully', form: deletedForm });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting form or event', error });
  }
};

module.exports = { deleteForm };
