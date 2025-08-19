var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var { 
 
  postWorkerDetailService, 
  loginWorkerService,
  getWorkerByIdService,
  updateWorkerService,
  deleteWorkerService
} = require('../services/workerRegisterServices');



router.get('/get-worker', async (req, res) => {
  try {
    const id = req.query.id;
    const result = await getWorkerByIdService(id);
    console.log(result)
    res.json({
      success: true,
      message: "Worker details fetched successfully",
      data: result
    });
  } catch (err) {
    console.error("Get Worker Error:", err);
    res.status(500).json({ success: false, message: "Database error", error: err.message });
  }
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

router.put('/update_worker/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await updateWorkerService(id, req.body);
    res.json({
      success: true,
      message: "Worker updated successfully",
      data: result
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed", error: err.message });
  }
});

// 🔹 Delete Worker
router.delete('/delete-worker', async (req, res) => {
  try {
    const id = req.query.id;
    const result = await deleteWorkerService(id);  // result = OkPacket
    if (result.affectedRows > 0) {
      res.json({
        success: true,
        message: "Worker deleted successfully",
        affectedRows: result.affectedRows
      });
    } else {
      res.json({
        success: false,
        message: "No worker found with this ID"
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed", error: err.message });
  }
});





module.exports = router;
