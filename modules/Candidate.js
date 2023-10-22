const { Schema, model } = require("mongoose");

const candidateSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
});

module.exports = model("Candidate", candidateSchema);