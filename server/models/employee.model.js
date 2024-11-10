module.exports = mongoose.model("Employee", employeeSchema);
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeName: {
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
  shopID: {
    type: String,
    required: true,
    ref: "Admin",
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
