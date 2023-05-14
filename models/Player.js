const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const positions = ["PORTERO", "CIERRE", "ALA", "PIVOT"];

const playerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "El nombre tiene que tener un mínimo de 2 caracteres y un máximo de 20 caracteres."],
      maxLength: [20, "El nombre tiene que tener un mínimo de 2 caracteres y un máximo de 20 caracteres."],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "El/los apellido/s tiene/n que tener un mínimo de 2 caracteres y un máximo de 60 caracteres."],
      maxLength: [60, "El/los apellido/s tiene/n que tener un mínimo de 2 caracteres y un máximo de 60 caracteres."],
    },
    favPosition: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      enum: [positions, "La posición solo puede ser PORTERO, CIERRE, ALA O PIVOT."],
    },
    number: {
      type: Number,
      required: true,
      min: [1, "El dorsal tiene que estar entre 1 y 99."],
      max: [99, "El dorsal tiene que estar entre 1 y 99."],
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
