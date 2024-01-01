const mongoose = require('mongoose');

const wardenSchema = new mongoose.Schema({
  universityId: String,
  password: String,
  token: String,
});

module.exports = mongoose.model('Warden', wardenSchema);