const { access } = require("fs");
const Admin = require("../models/admin.model.js"); 
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const employeeModel = require("../models/employee.model.js");
const registerEmployee  = async(req, res) =>{

  const {EmployeeName, email, password, phone, shopName} = req.body;
  
  const admin = await Admin.findOne({shopName:shopName})
  console.log(admin)
  const shopID = admin.shopID

  const newEmployee = new employeeModel({
    EmployeeName,
    email,
    password,
    phone,
    shopID
  });

  const savedEmployee = await newEmployee.save();

  return res.status(201).json(savedEmployee);
}

const loginEmployee = async(req, res) =>{
  const {email, password, employeeName} = req.body
  const employee = await employeeModel.findOne(
    {
        $or:[{employeeName, email}]
    }
)
  if (!employee) {
    return res.status(404).json({ message: "Admin not found" })
  }
  const isPasswordValid = await employee.isPasswordCorrect(password)
  if(!isPasswordValid){
    return res.status(401).json({ message: "Incorrect password" });
}
  const accessToken = await employee.generateAccessToken(employee._id)
  console.log(accessToken)

  return res.status(200).json(
    {employee, accessToken }
  )
}


module.exports = {registerEmployee, loginEmployee}