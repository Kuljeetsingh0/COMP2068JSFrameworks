
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  StudentNumber: { type: String, required: true },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  Email: { type: String, required: true },
});

const Contact = mongoose.model('Contact', contactSchema);


module.exports = Contact;
