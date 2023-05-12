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

const Team = mongoose.model("Team", TeamSchema);
module.exports = { Team };
