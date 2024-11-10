const axios = require('axios');
const fs = require('fs');
const path = require('path');

function convertTextToNumber(text) {
    let numericValue = 0;
    for (let i = 0; i < text.length; i++) {
        numericValue += text.charCodeAt(i);
    }

    return numericValue.toString().slice(0, 16);
}

const inputText = "Sam";
const result1 = convertTextToNumber(inputText);

console.log("Converted value:", result1);



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

        // Decode the base64 string
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // Specify the file path to save the image
        const filePath = path.join(__dirname, `samarth_barcode${result1}.png`);

        // Write the image data to a file
        fs.writeFileSync(filePath, imageBuffer);
        console.log('Barcode image saved successfully:', filePath);
    } catch (error) {
        console.error('Error generating barcode:', error);
    }
}

// Example usage
generateBarcode(result1+inputText);
