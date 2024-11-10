const Admin = require("../models/admin.model.js"); 

const crypto = require("crypto")
const registerAdmin  = async(req, res) =>{

  const {adminName, email, password, shopName} = req.body;
  const shopID = crypto.randomBytes(8).toString("hex");
  console.log(email)
  console.log(shopID)

  const user = await Admin.find({email: email});
  
  if(user.length > 0){
    console.log(user, "checcked")
    return res.json({message:"User already registered"})
  }

  console.log("after")
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
  const admin = await Admin.findOne({email: email})
  const isPasswordValid = await admin.isPasswordCorrect(password)
  if(!isPasswordValid){
    throw new Error
}
  const {accessToken} = await admin.generateAccessToken(user._id)

  return res.status(200).json(
    {admin, accessToken}
  )


}
module.exports = {registerAdmin, loginAuth}