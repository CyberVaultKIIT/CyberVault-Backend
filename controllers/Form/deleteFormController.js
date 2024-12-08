
const Form = require('../../models/Form'); 




const deleteForm = async (req, res) =>{
  try {
    const { formId } = req.body;


    const deletedForm = await Form.findOneAndDelete({ _id: formId });

    if (!deletedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json({ message: 'Form deleted successfully', form: deletedForm });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting form', error });
  }
};

module.exports = { deleteForm };
