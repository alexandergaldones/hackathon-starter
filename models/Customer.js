const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    name: String,
    mobileNumber: String
}, {timestamps: true});


/**
 * Sample Helper method
 */

 customerSchema.methods.hasDescription