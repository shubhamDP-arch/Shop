

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
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

employeeSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10)
  next()
})
employeeSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}
employeeSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}


module.exports = mongoose.model("Employee", employeeSchema);
