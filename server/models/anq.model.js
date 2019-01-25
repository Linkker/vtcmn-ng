const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a schema
const anqSchema = new Schema({
	feedbackName: {
    type: String,
    required: true
  },
  feedbackTitle: {
    type: String,
    required: true
  },
  feedbackMessenger:{
    type: String,
    required: true
  },
  feedbackCreateAt: { type: Date, default: Date.now },
  feedbackAnswer:[{
    messenger: { type: String},
    messengerEmail:{ type: String},
    messengerCreateAt:{ type: Date, default: Date.now }
  }]
});

// Create a model
const Anq = mongoose.model('anq', anqSchema);

// Export the model
module.exports = Anq;
