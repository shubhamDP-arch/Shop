const fs = require('fs');
const path = require('path');
const axios =  require("axios");
const Products = require('../models/product.model');

const home = async(req, res) => {
    console.log("Hii Welcome to controllers")
    res.json({msg: "Hii Welcome to controllers"})
}

const addProduct = async(req, res) => {

    const productName = req.body.productname;

    function convertTextToNumber(text) {
        let numericValue = 0;
        for (let i = 0; i < text.length; i++) {
            numericValue += text.charCodeAt(i);
        }

        return numericValue.toString().slice(0, 16);
    }

    const result = convertTextToNumber(productName);

    async function generateBarcode(result) {
        const apiUrl = `https://barcodeapi.org/api/${result}`;

        try {
            // Fetch the barcode data (assuming it's JSON)
            const response = await axios.get(apiUrl);
            
            // Extract the base64 string from the response
            const base64Data = response.data.base64; // Adjust based on actual structure
            
            if (!base64Data) {
                console.error('No base64 data found in the response.');
                return;
            }

  // Specify the file path to save the image
  const imageBuffer = Buffer.from(base64Data, "base64")
  const imagesDir = path.join(__dirname, `images`);
  if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir);
  }
  
  // Specify the file path to save the image
  const imagePath = path.join(imagesDir, `barcode${result}.png`);
  

  // Write the image data to a file
  fs.writeFileSync(imagePath, imageBuffer);
  console.log('Barcode image saved successfully:', imagePath);

        } catch (error) {
            console.error('Error generating barcode:', error);
        }
    }

    // Example usage
    const barcodeId = (result + productName.slice(0,4)).trim()
    const imageName = `barcode${barcodeId}.png`
    generateBarcode(barcodeId);
    const createProduct = await Products.create({barcodeid: barcodeId,imagename: imageName, productname: productName, quantity: 0, price: 0, total_sold: 0, shopid: "SHOP001", productthreshold: 0} )
    console.log(createProduct)
    res.json({msg: 'Success'})
}

const scanProduct = async(req, res) => {
    const {data} = req.body;
    console.log("data", data)
    const fetchProduct = await Products.findOne({barcodeid: data})
    console.log("fetchProduct", fetchProduct)
}

module.exports = {home, addProduct, scanProduct}