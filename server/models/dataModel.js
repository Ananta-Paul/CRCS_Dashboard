const mongoose = require("mongoose");
const dataModel = mongoose.Schema({
  "Sr. No.": { type: Number },
  intensity: { type: Number },
  "Sector Type": { type: "String" },
  "Name of Society": { type: "String" },
  District: { type: "String" },
  "Area of Operation": { type: "String" },
  State: { type: "String" },
  "Date of Registration": { type: "String" },
  Address: { type: "String" },
});

const Data = mongoose.model("Data", dataModel);
module.exports = Data;
