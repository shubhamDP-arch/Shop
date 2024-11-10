const express = require("express")
const router = express.Router();
const authControllers = require("../controllers/auth-controllers");
const adminAuth = require("../controllers/adminAuth.controllers");
const authMiddleware = require("../middleware/auth-middleware")

router.route("/").get(authControllers.home)
router.route("/addproduct").post(authControllers.addProduct);
router.route("/scanproduct").post(authControllers.scanProduct)
router.route("/sign-up/Admin").post(adminAuth.registerAdmin);
router.route("/getproducts").post( authControllers.getProducts);
router.route("/productdetail").post(authControllers.productDetails)
router.route("/updateproduct").post(authControllers.updateProduct)

module.exports = router