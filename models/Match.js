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
      required: false,
      min: [0, "Pensamos que marcar menos de 0 goles es complicado y más de 15 es pasarse..."],
      max: [15, "Pensamos que marcar menos de 0 goles es complicado y más de 15 es pasarse..."],
    },
    goalsOfVisiting: {
      type: Number,
      required: false,
      min: [0, "Pensamos que marcar menos de 0 goles es complicado y más de 15 es pasarse..."],
      max: [15, "Pensamos que marcar menos de 0 goles es complicado y más de 15 es pasarse..."],
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
