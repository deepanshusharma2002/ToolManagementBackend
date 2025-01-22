const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const AdminEquipmentsRoutes = require('./Routes/AdminEquipmentsRoutes.js');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tool_management')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });


app.use("/api", AdminEquipmentsRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
