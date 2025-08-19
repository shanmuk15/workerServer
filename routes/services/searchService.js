const searchDAO = require("../dao/searchDAO");
async function getStatesService() {
  return await searchDAO.getStates();
}

async function getDistrictsService(state) {
  return await searchDAO.getDistricts(state);
}

async function getMandalsService(district) {
  return await searchDAO.getMandals(district);
}

async function getVillagesService(mandal) {
  return await searchDAO.getVillages(mandal);
}

async function getSkillsService() {
  return await searchDAO.getSkills();
}

async function searchWorkersService(filters) {
  return await searchDAO.searchWorkers(filters);
}

module.exports = {
  getStatesService,
  getDistrictsService,
  getMandalsService,
  getVillagesService,
  getSkillsService,
  searchWorkersService
};
