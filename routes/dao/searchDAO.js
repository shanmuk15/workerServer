const db = require("../../db");

function getStates() {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT State FROM register_people ORDER BY State", (err, results) => {
      if (err) return reject(err);
      resolve(results.map(r => r.State));
    });
  });
}

function getDistricts(state) {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT District FROM register_people WHERE State = ? ORDER BY District", [state], (err, results) => {
      if (err) return reject(err);
      resolve(results.map(r => r.District));
    });
  });
}

function getMandals(district) {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT Mandal FROM register_people WHERE District = ? ORDER BY Mandal", [district], (err, results) => {
      if (err) return reject(err);
      resolve(results.map(r => r.Mandal));
    });
  });
}

function getVillages(mandal) {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT Village FROM register_people WHERE Mandal = ? ORDER BY Village", [mandal], (err, results) => {
      if (err) return reject(err);
      resolve(results.map(r => r.Village));
    });
  });
}

function getSkills() {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT Skill FROM register_people ORDER BY Skill", (err, results) => {
      if (err) return reject(err);
      resolve(results.map(r => r.Skill));
    });
  });
}

function searchWorkers(filters) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM register_people WHERE 1=1";
    const params = [];

    if (filters.state) { sql += " AND State = ?"; params.push(filters.state); }
    if (filters.district) { sql += " AND District = ?"; params.push(filters.district); }
    if (filters.mandal) { sql += " AND Mandal = ?"; params.push(filters.mandal); }
    if (filters.village) { sql += " AND Village = ?"; params.push(filters.village); }
    if (filters.skill) { sql += " AND Skill = ?"; params.push(filters.skill); }

    db.query(sql, params, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

module.exports = {
  getStates,
  getDistricts,
  getMandals,
  getVillages,
  getSkills,
  searchWorkers
};
