const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  mobileNumber: String,
  description: String
}, { timestamps: true });

/**
 * Pre-saving Middleware
 */

customerSchema.pre('save', (next) => {
  next();
});

/**
 * Sample Helper method
 * Check customer if has description
 */

customerSchema.methods.hasDescription = function hasDescription(description){
};


const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;
