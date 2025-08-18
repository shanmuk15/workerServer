const express = require("express");
const router = express.Router();
const searchService = require("../services/searchService");

router.get("/getStates", async (req, res) => {
  try {
    const states = await searchService.getStatesService();
    res.json(states);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getDistricts", async (req, res) => {
  try {
    const districts = await searchService.getDistrictsService(req.query.state);
    res.json(districts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getMandals", async (req, res) => {
  try {
    const mandals = await searchService.getMandalsService(req.query.district);
    res.json(mandals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getVillages", async (req, res) => {
  try {
    const villages = await searchService.getVillagesService(req.query.mandal);
    res.json(villages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getSkills", async (req, res) => {
  try {
    const skills = await searchService.getSkillsService();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/searchWorkers", async (req, res) => {
  try {
    const workers = await searchService.searchWorkersService(req.body);
    console.log(workers)
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
