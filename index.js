const express = require("express");
const { playerRouter } = require("./routes/player.routes.js");
const { teamRouter } = require("./routes/team.routes.js");
const { matchRouter } = require("./routes/match.routes.js");
const cors = require("cors");

// Conexión a la BBDD
const { connect } = require("./db.js");
connect();

// Configuración del server
const PORT = 3000;
const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Rutas
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Esta es la home de nuestra API");
});
router.get("*", (req, res) => {
  res.status(404).send("Lo sentimos :( No hemos encontrado la página solicitada.");
});

// Usamos las rutas
server.use("/match", matchRouter);
server.use("/team", teamRouter);
server.use("/player", playerRouter);
server.use("/", router);

server.listen(PORT, () => {
  console.log(`Server levantado en el puerto ${PORT}`);
});
