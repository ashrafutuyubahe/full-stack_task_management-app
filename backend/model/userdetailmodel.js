const mongoose = require('mongoose');


const EmployeeSchema = new mongoose.Schema({
  title: { type: String },
  firstName: { type: String},
  lastName: { type: String },
  position: { type: String},
  company: { type: String},
  business: { type: String },
  employees: { type: String },
  street: { type: String },
  additional: { type: String},
  zip: { type: String},
  place: { type: String },
  country: { type: String },
  code: { type: String },
  phone: { type: String},
  email: { type: String },
  checkbox: { type: Boolean }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
