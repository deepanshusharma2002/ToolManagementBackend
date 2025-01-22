const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminEquipmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,  
        min: 0
    },
    image: {
        type: String,
        default: null,
    }
}, { timestamps: true });  

const AdminEquipment = mongoose.model('AdminEquipment', adminEquipmentSchema);

module.exports = AdminEquipment;
