const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const infoSchema = new Schema({
	category: {
    type: String,
    enum:['tab01','tab02','tab03','tab04'],
    lowercase: true,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  content:{
    type: String
  },
  infoEmail: {
    type: String,
    required: true
  },
  CreateAt:{ type: Date, default: Date.now }
});

// Create a model
const Info = mongoose.model('info', infoSchema);

// Export the model
module.exports = Info;
