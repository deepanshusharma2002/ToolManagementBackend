const express = require('express');
const AdminEquipmentsControllers = require('../Controllers/AdminEquipmentsControllers');
const router = express.Router();

// Route to log in a user
router.post('/login', AdminEquipmentsControllers.Login)
.post('/register', AdminEquipmentsControllers.Register)

module.exports = router;