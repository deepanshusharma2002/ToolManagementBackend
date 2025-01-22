// Example of user registration route
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import cors
const User = require('./Models/User.js');
const AdminEquipment = require('./Models/AdminEquipment.js');
const multer = require("multer");
const AdminEquipmentsRoutes = require('./Routes/AdminEquipmentsRoutes.js')

const app = express();
app.use(cors());
app.use(express.json());

const storageMulti = multer.memoryStorage();
const uploadMulti = multer({
    storage: storageMulti,
    limits: { fileSize: 1000000 },
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tool_management')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });


app.use("/api", AdminEquipmentsRoutes)

// Route to add new equipment
app.post('/api/add/equipments', uploadMulti.any(), async (req, res) => {
    try {
        const { id, name, quantity, image } = req.body;
        console.log("req.body", req.body);
        console.log("req.files", req.files);

        // Check if image exists in files
        let imageBase64 = null;
        if (req.files && req.files[0]) {
            imageBase64 = req.files[0].buffer.toString('base64');
        }

        // Check if the request contains an ID, meaning it's an update
        if (id) {
            // Find the equipment by ID and update it
            const updatedEquipment = await AdminEquipment.findByIdAndUpdate(
                id,
                { name, quantity, image: imageBase64 },
                { new: true }  // Return the updated document
            );

            if (!updatedEquipment) {
                return res.status(404).json({
                    message: 'Equipment not found',
                });
            }

            // Send success response for update
            return res.status(200).json({
                message: 'Equipment updated successfully',
                data: updatedEquipment,
            });
        } else {
            // No ID provided, create a new equipment record
            const newEquipment = new AdminEquipment({
                name,
                quantity,
                image: imageBase64,  // Allow null if image is not provided
            });

            // Save the equipment to the database
            await newEquipment.save();

            // Send success response for creation
            return res.status(201).json({
                message: 'Equipment added successfully',
                data: newEquipment,
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to process equipment',
            error: err.message,
        });
    }
});

// Route to fetch all equipment (GET)
app.get('/api/allequipments', async (req, res) => {
    try {
        const equipmentList = await AdminEquipment.find();  // Fetch all documents
        res.status(200).json(equipmentList);  // Respond with the list of equipment
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to retrieve equipment list',
            error: err.message,
        });
    }
});

app.delete('/api/equipments/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Get the ID from the request parameters

        // Find the equipment by ID and remove it
        const deletedEquipment = await AdminEquipment.findByIdAndDelete(id);

        if (!deletedEquipment) {
            return res.status(404).json({
                message: 'Equipment not found',
            });
        }

        // Send success response
        res.status(200).json({
            message: 'Equipment deleted successfully',
            data: deletedEquipment,  // Send the deleted equipment data in response
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to delete equipment',
            error: err.message,
        });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
