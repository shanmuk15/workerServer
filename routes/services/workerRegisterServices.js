const { 
  getWorkerDetailsDAO, 
  postWorkerDetailsDAO, 
  loginWorkerDAO 
} = require('../dao/workerRegisterDao');

const jwt = require('jsonwebtoken');

function getWorkerService() {
  return getWorkerDetailsDAO();
}

async function postWorkerDetailService(workerData) {
  // future లో validation / business logic ఇక్కడ పెట్టవచ్చు
  return await postWorkerDetailsDAO(workerData);
}

async function loginWorkerService(phone, password) {
  const user = await loginWorkerDAO(phone, password);

  // DAO already throws error if not found / invalid password
  const payload = {
    id: user.id,       // DB లో ఉన్న user primary key
    phone: user.Phone  // DB లోని Phone column
  };

  const token = jwt.sign(payload, "myToken", { expiresIn: "1h" });

  // sensitive info remove
  delete user.Password;

  // attach token
  user.token = token;

  return user;
}

module.exports = { 
  getWorkerService, 
  postWorkerDetailService,
  loginWorkerService
};
