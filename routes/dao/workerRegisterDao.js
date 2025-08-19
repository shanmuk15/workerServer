const db = require('../../db');
const bcrypt = require('bcrypt');

function loginWorkerDAO(phone, password) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM register_people WHERE phone = ?`;

    db.query(sql, [phone], async (err, results) => {
      if (err) return reject(err);

      if (results.length === 0) {
        const error = new Error("User not found");
        error.status = 401; // 🔴 Unauthorized
        return reject(error);
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        const error = new Error("Invalid credentials");
        error.status = 401; // 🔴 Unauthorized
        return reject(error);
      }

      resolve(user);
    });
  });
}

function postWorkerDetailsDAO(workerData) {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, state, district, mandal, village, phone, skill, password } = workerData;

      // hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
        INSERT INTO register_people (name, state, district, mandal, village, phone, skill, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [name, state, district, mandal, village, phone, skill, hashedPassword],
        (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result.insertId);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

function getWorkerByIdDAO(id) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, name, state, district, mandal, village, phone, skill FROM register_people WHERE id = ?`;
    db.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

function updateWorkerDAO(id, workerData) {
  return new Promise((resolve, reject) => {
    const { name, state, district, mandal, village, phone, skill } = workerData;
    const sql = `
      UPDATE register_people 
      SET name=?, state=?, district=?, mandal=?, village=?, phone=?, skill=? 
      WHERE id=?
    `;
    db.query(sql, [name, state, district, mandal, village, phone, skill, id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

function deleteWorkerDAO(id) {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM register_people WHERE id=?`;
    db.query(sql, [id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = {  
  getWorkerByIdDAO, 
  updateWorkerDAO, 
  deleteWorkerDAO,  
  postWorkerDetailsDAO,
  loginWorkerDAO
};
