const db = require("../../db");

function getStates() {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT state FROM register_people ORDER BY state", (err, results) => {
      if (err) return reject(err);
      resolve(results.map(r => r.state));
    });
  });
}

function getDistricts(state) {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT district FROM register_people WHERE State = ? ORDER BY district", [state], (err, results) => {
      if (err) return reject(err);
      resolve(results.map(r => r.district));
    });
  });
}

function getMandals(district) {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT mandal FROM register_people WHERE District = ? ORDER BY mandal", [district], (err, results) => {
      if (err) return reject(err);
      resolve(results.map(r => r.mandal));
    });
  });
}

function getVillages(mandal) {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT village FROM register_people WHERE Mandal = ? ORDER BY village", [mandal], (err, results) => {
      if (err) return reject(err);
      resolve(results.map(r => r.village));
    });
  });
}

function getSkills() {
  return new Promise((resolve, reject) => {
    db.query("SELECT DISTINCT skill FROM register_people ORDER BY skill", (err, results) => {
      if (err) return reject(err);
      resolve(results.map(r => r.skill));
    });
  });
}

function searchWorkers(filters) {
  return new Promise((resolve, reject) => {
    let sql = "SELECT * FROM register_people WHERE 1=1";
    const params = [];

    if (filters.state) { sql += " AND state = ?"; params.push(filters.state); }
    if (filters.district) { sql += " AND district = ?"; params.push(filters.district); }
    if (filters.mandal) { sql += " AND mandal = ?"; params.push(filters.mandal); }
    if (filters.village) { sql += " AND village = ?"; params.push(filters.village); }
    if (filters.skill) { sql += " AND skill = ?"; params.push(filters.skill); }

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
