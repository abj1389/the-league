const express = require("express");

// Modelos
const { Match } = require("../models/Match.js");

const router = express.Router();

// CRUD: READ
router.get("/", async (req, res) => {
  try {
    // Asi leemos query params
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const matches = await Match.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .populate(["localTeam", "visitingTeam"]);

    // Num total de elementos
    const totalElements = await Match.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: matches,
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
    const match = await Match.findById(id).populate(["localTeam", "visitingTeam"]);
    if (match) {
      res.json(match);
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
    const match = await Match.find({ name: new RegExp("^" + name.toLowerCase(), "i") }).populate(["localTeam", "visitingTeam"]);
    if (match?.length) {
      res.json(match);
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
    const match = new Match(req.body);

    const createdMatch = await match.save();
    return res.status(201).json(createdMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

// CRUD: DELETE
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const matchDeleted = await Match.findByIdAndDelete(id);
    if (matchDeleted) {
      res.json(matchDeleted);
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
    const matchUpdated = await Match.findByIdAndUpdate(id, req.body, { new: true });
    if (matchUpdated) {
      res.json(matchUpdated);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = { matchRouter: router };
