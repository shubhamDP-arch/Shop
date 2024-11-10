const Admin = require("../models/admin.model.js"); 

const crypto = require("crypto")
const registerAuth  = async(req, res) =>{

  const {adminName, email, password, shopName} = req.body;
  const shopID = crypto.randomBytes(8).toString("hex");
  console.log(shopID)
  const admin = new Admin({
    adminName,
    email,
    password,
    shopName,
    shopID
  })

  const savedAdmin = await admin.save();
  return res.status(201).json(
    savedAdmin
)
}

const loginAuth = async(req, res) =>{
  const {email, password, adminName} = req.body
  const admin = Admin.findOne(
    {
        $or:[{adminName, email}]
    }
)
  const isPasswordValid = await admin.isPasswordCorrect(password)
  if(!isPasswordValid){
    throw new Error
}
  const {accessToken} = await admin.generateAccessToken(user._id)

  return res.status(200).json(
    {admin, }
  )


}
module.exports = {registerAdmin}