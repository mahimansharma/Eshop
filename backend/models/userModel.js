const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String, required: true, unique: true, index: true, dropDups: true,
    },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    phone: {
        type: Number,
        unique: true
    },
    address1: {
        type: String,
    },
    address2: {
        type: String
    },
    pincode: {
        type: Number
    },
    cart: {
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },    
});

const User = mongoose.model('User', userSchema);

module.exports = {User}