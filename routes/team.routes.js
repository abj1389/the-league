const express = require("express");

// Modelos
const { Team } = require("../models/Team.js");
//const { Sample } = require("../models/Sample.js");

const router = express.Router();

// CRUD: READ
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const teams = await Team.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // Num total de elementos
    const totalElements = await Team.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: teams,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: READ
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let team = await Team.findById(id);

    if (team) {
      const includeParents = req.query.includeParents === "true";

      if (includeParents) {
        const parents = await Sample.find({ child: id });
        if (parents) {
          team = team.toObject();
          team.parents = parents;
        }
      }

      res.json(team);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/name/:name", async (req, res) => {
  const name = req.params.name;

  try {
    const player = await Player.find({ name: new RegExp("^" + name.toLowerCase(), "i") }); //.populate("child");
    if (player?.length) {
      res.json(player);
    } else {
      res.status(404).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: CREATE
router.post("/", async (req, res) => {
  console.log(req.headers);

  try {
    const team = new Team(req.body);
    const createdTeam = await team.save();
    return res.status(201).json(createdTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const teamDeleted = await Team.findByIdAndDelete(id);
    if (teamDeleted) {
      res.json(teamDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: UPDATE
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const teamUpdated = await Team.findByIdAndUpdate(id, req.body, { new: true });
    if (teamUpdated) {
      res.json(teamUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = { teamRouter: router };
