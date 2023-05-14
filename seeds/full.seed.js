const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Player } = require("../models/Player.js");
const { Team } = require("../models/Team.js");

let teamList = [
  {
    name: "Porcinos FC",
    foundationYear: 2015,
    city: "BARCELONA",
  },
  {
    name: "Saiyans FC",
    foundationYear: 2017,
    city: "MADRID",
  },
  {
    name: "Trueno FC",
    foundationYear: 2020,
    city: "VALENCIA",
  },
  {
    name: "Frikis FC",
    foundationYear: 2017,
    city: "LA CORUÑA",
  },
];

let playerList = [
  {
    firstName: "Lionel",
    lastName: "Messi",
    favPosition: "PIVOT",
    number: 10,
  },
  {
    firstName: "Luis",
    lastName: "Suarez",
    favPosition: "PIVOT",
    number: 9,
  },
  {
    firstName: "Sergio",
    lastName: "Busquets",
    favPosition: "ALA",
    number: 5,
  },
  {
    firstName: "Jordi",
    lastName: "Alba",
    favPosition: "CIERRE",
    number: 18,
  },
  {
    firstName: "Pedri",
    lastName: "Lopez",
    favPosition: "PORTERO",
    number: 16,
  },
  {
    firstName: "Karim",
    lastName: "Benzema",
    favPosition: "PIVOT",
    number: 9,
  },
  {
    firstName: "Sergio",
    lastName: "Ramos",
    favPosition: "CIERRE",
    number: 4,
  },
  {
    firstName: "Luka",
    lastName: "Modric",
    favPosition: "ALA",
    number: 10,
  },
  {
    firstName: "Toni",
    lastName: "Kroos",
    favPosition: "PORTERO",
    number: 8,
  },
  {
    firstName: "Eden",
    lastName: "Hazard",
    favPosition: "PIVOT",
    number: 7,
  },
  {
    firstName: "Kevin",
    lastName: "De Bruyne",
    favPosition: "ALA",
    number: 17,
  },
  {
    firstName: "Raheem",
    lastName: "Sterling",
    favPosition: "PIVOT",
    number: 7,
  },
  {
    firstName: "Neymar",
    lastName: "Jr",
    favPosition: "PIVOT",
    number: 10,
  },
  {
    firstName: "Kylian",
    lastName: "Mbappé",
    favPosition: "PIVOT",
    number: 7,
  },
  {
    firstName: "Marquinhos",
    lastName: "Pele",
    favPosition: "CIERRE",
    number: 5,
  },
  {
    firstName: "Marco",
    lastName: "Verratti",
    favPosition: "ALA",
    number: 6,
  },
  {
    firstName: "Ángel",
    lastName: "Di María",
    favPosition: "PORTERO",
    number: 11,
  },
  {
    firstName: "Jesus",
    lastName: "De Nazareth",
    favPosition: "CIERRE",
    number: 23,
  },
  {
    firstName: "Marcos",
    lastName: "Maradona",
    favPosition: "ALA",
    number: 4,
  },
  {
    firstName: "Ángel",
    lastName: "Cristo",
    favPosition: "ALA",
    number: 12,
  },
];

const fullSeed = async () => {
  try {
    // CONEXION
    const database = await connect();

    // BORRADO
    await Player.collection.drop();
    await Team.collection.drop();
    console.log("Borrados players y teams");

    // CREACION DOCUMENTOS
    teamList = teamList.map((elem) => new Team(elem));

    // RELACIONES

    for (let i = 0; i < playerList.length; i++) {
      const player = playerList[i];
      const teamIndex = parseInt(i / 5).toFixed();
      const team = teamList[teamIndex];
      player.team = team;
    }

    // CREACION DE LOS OTROS DOCUMENTOS
    playerList = playerList.map((elem) => new Player(elem));

    await Team.insertMany(teamList);
    await Player.insertMany(playerList);
    console.log("Creados players correctamente");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.disconnect();
  }
};

fullSeed();
