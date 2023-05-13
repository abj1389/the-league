const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Match } = require("../models/Match.js");
const { Team } = require("../models/Team.js");
const { generateRandom } = require("../utils.js");

const matchSeed = async () => {
  try {
    // CONEXION
    const database = await connect();

    // BORRADO

    await Match.collection.drop();
    console.log("Borrado match");

    // CREACION DOCUMENTOS
    const date = new Date();
    const today = new Date();
    date.setDate(date.getDate() - 12);
    const teamList = await Team.find({});

    for (let i = 0; i < teamList.length; i++) {
      for (let j = i; j < teamList.length; j++) {
        if (teamList[i] !== teamList[j]) {
          await new Match({
            localTeam: teamList[i],
            visitingTeam: teamList[j],
            goalsOfLocal: date < today ? generateRandom(0, 10) : null,
            goalsOfVisiting: date < today ? generateRandom(0, 10) : null,
            date: date.setDate(date.getDate() + 4),
            matchPlayed: date > today ? false : true,
          }).save();

          await new Match({
            localTeam: teamList[j],
            visitingTeam: teamList[i],
            goalsOfLocal: date < today ? generateRandom(0, 10) : null,
            goalsOfVisiting: date < today ? generateRandom(0, 10) : null,
            date: date.setDate(date.getDate() + 4),
            matchPlayed: date > today ? false : true,
          }).save();
        }
      }
    }

    // CREACION DE LOS OTROS DOCUMENTOS

    console.log("Creados matches correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

matchSeed();
