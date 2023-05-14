const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const provincias = ["ÁLAVA", "ALBACETE", "ALICANTE", "ALMERÍA", "ASTURIAS", "ÁVILA", "BADAJOZ", "BARCELONA", "BURGOS", "CÁCERES", "CÁDIZ", "CANTABRIA", "CASTELLÓN", "CIUDAD REAL", "CÓRDOBA", "CUENCA", "GERONA", "GRANADA", "GUADALAJARA", "GUIPÚZCOA", "HUELVA", "HUESCA", "ISLAS BALEARES", "JAÉN", "LA CORUÑA", "LA RIOJA", "LAS PALMAS", "LEÓN", "LÉRIDA", "LUGO", "MADRID", "MÁLAGA", "MURCIA", "NAVARRA", "ORENSE", "PALENCIA", "PONTEVEDRA", "SALAMANCA", "SANTA CRUZ DE TENERIFE", "SEGOVIA", "SEVILLA", "SORIA", "TARRAGONA", "TERUEL", "TOLEDO", "VALENCIA", "VALLADOLID", "VIZCAYA", "ZAMORA", "ZARAGOZA"];

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: [2, "El nombre tiene que tener un mínimo de 2 caracteres y un máximo de 20 caracteres."],
      maxLength: [20, "El nombre tiene que tener un mínimo de 2 caracteres y un máximo de 20 caracteres."],
    },
    foundationYear: {
      type: Number,
      required: true,
      min: 1930,
      max: new Date().getFullYear(),
    },
    city: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      enum: provincias,
    },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);
module.exports = { Team };
