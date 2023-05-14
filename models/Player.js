const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const positions = ["PORTERO", "CIERRE", "ALA", "PIVOT"];

const playerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 20,
    },
    favPosition: {
      type: String,
      required: true,
      trim: true,
      enum: positions,
    },
    number: {
      type: Number,
      required: true,
      min: 1,
      max: 99,
    },
    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);
module.exports = { Player };
