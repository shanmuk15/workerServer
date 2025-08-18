const db = require('../../db');
const bcrypt = require('bcrypt');

function getWorkerDetailsDAO() {
    return "veena";
}


function loginWorkerDAO(phone, password) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM register_people WHERE Phone = ?`;

    db.query(sql, [phone], async (err, results) => {
      if (err) return reject(err);

      if (results.length === 0) {
        const error = new Error("User not found");
        error.status = 401; // 🔴 Unauthorized
        return reject(error);
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.Password);

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
                INSERT INTO register_people (Name, State, District, Mandal, Village, Phone, Skill, Password)
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

module.exports = { getWorkerDetailsDAO, postWorkerDetailsDAO ,loginWorkerDAO};
