const express = require('express');
const AdminEquipmentsControllers = require('../Controllers/AdminEquipmentsControllers');
const uploadMulti = require('../Utils/Multer');
const router = express.Router();

// Route to log in a user
router.post('/login', AdminEquipmentsControllers.Login)
    .post('/register', AdminEquipmentsControllers.Register)

    // Equipments Routes
    .post('/add/equipments', uploadMulti.any(), AdminEquipmentsControllers.AddEquipment)
    .get('/allequipments', AdminEquipmentsControllers.GetEquipments)
    .delete('/equipments/:id', AdminEquipmentsControllers.DeleteEquipments)

module.exports = router;