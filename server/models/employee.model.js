module.exports = mongoose.model("Employee", employeeSchema);
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  EmployeeName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true
  },
  shopID: {
    type: String,
    required: true,
    ref: "Admin",
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
