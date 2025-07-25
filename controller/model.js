const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
  treename: String,
  subname: String,
  history: String,
  pros: String,
  cons: String,
  life: String,
  treeimage: String,
  color: String
}, { 
  timestamps: true,
  collection: 'herbs' // ✅ Correct: match collection name
});

module.exports = mongoose.model('Tree', treeSchema);