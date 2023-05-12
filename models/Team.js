const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    foundationYear: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubSample = mongoose.model("SubSample", subSampleSchema, "testsubsample");
module.exports = { SubSample };
