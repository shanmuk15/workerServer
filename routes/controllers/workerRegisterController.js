var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var { getWorkerService, postWorkerDetailService, loginWorkerService } = require('../services/workerRegisterServices');
var validateToken = require('../../common/validateToken')
router.get('/get_worker', (req, res) => {
    const result = getWorkerService();
    res.send(result);
});

router.post('/register_people', async (req, res) => {
    try {
        const insertId = await postWorkerDetailService(req.body);
        res.json({
            message: 'Person registered successfully',
            id: insertId
        });
    } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Database error' });
    }
});


// 🔹 Login Route
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const user = await loginWorkerService(phone, password);

    res.json({
      message: "Login successful",
      id: user.id,
      token: user.token,
      user
    });
  } catch (err) {
    console.error("Error during login:", err);

    // ✅ respect error.status if available
    res.status(err.status || 500).json({ error: err.message });
  }
});



module.exports = router;
