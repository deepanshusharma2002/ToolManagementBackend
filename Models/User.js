// Models/User.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v); // 10-digit phone number
            },
            message: props => `${props.value} is not a valid phone number!`,
        },
    },
    role: {
        type: String,
        default: 'User',
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
