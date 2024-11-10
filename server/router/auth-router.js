const express = require("express")
const router = express.Router();
const authControllers = require("../controllers/auth-controllers")

router.route("/").get(authControllers.home)
router.route("/addproduct").post(authControllers.addProduct);
router.route("/scanproduct").post(authControllers.scanProduct)

module.exports = router