const express = require("express")
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const { registerAdmin, loginAuth } = require("../controllers/adminAuth.controllers");
const { registerEmployee, loginEmployee } = require("../controllers/employeeAuth.controller");

router.route("/").get(authControllers.home)
router.route("/addproduct").post(authControllers.addProduct);
router.route("/scanproduct").post(authControllers.scanProduct)
router.route("/sign-up/Admin").post(registerAdmin)
router.route("/login/Admin").post(loginAuth)
router.route("/sign-up/employee").post(registerEmployee)
router.route("/login/employee").post(loginEmployee)

module.exports = router