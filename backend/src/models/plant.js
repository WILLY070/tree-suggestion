const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  soils: [String], // e.g., ['sandy','loam','clay']
  rainfallMin: Number,
  rainfallMax: Number,
  benefit: String,
  notes: String
});

module.exports = mongoose.model('Plant', plantSchema);
