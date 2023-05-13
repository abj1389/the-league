const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema(
  {
    localTeam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
    visitingTeam: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Team",
    },
    goalsOfLocal: {
      type: Number,
      required: true,
    },
    goalsOfVisiting: {
      type: Number,
      required: true,
    },
    matchPlayed: {
      type: Boolean,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Match = mongoose.model("Match", matchSchema);
module.exports = { Match };
