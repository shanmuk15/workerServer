const { 
  getWorkerDetailsDAO, 
  postWorkerDetailsDAO, 
  loginWorkerDAO,
  getWorkerByIdDAO,
  updateWorkerDAO,
  deleteWorkerDAO
} = require('../dao/workerRegisterDao');

const jwt = require('jsonwebtoken');

function getWorkerService() {
  return getWorkerDetailsDAO();
}

function getWorkerByIdService(id) {
  return getWorkerByIdDAO(id);
}

function updateWorkerService(id, workerData) {
  return updateWorkerDAO(id, workerData);
}

function deleteWorkerService(id) {
  return deleteWorkerDAO(id);
}

async function postWorkerDetailService(workerData) {
  return await postWorkerDetailsDAO(workerData);
}

async function loginWorkerService(phone, password) {
  const user = await loginWorkerDAO(phone, password);
  const payload = { id: user.id, phone: user.Phone };
  const token = jwt.sign(payload, "myToken", { expiresIn: "1h" });

  delete user.Password;
  user.token = token;

  return user;
}

module.exports = { 
 
  postWorkerDetailService,
  loginWorkerService,
  getWorkerByIdService,
  updateWorkerService,
  deleteWorkerService
};