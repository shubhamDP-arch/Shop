import React, { useEffect, useState } from 'react';
import Quagga from 'quagga'; // Ensure you have quagga installed
import {useNavigate} from "react-router-dom"
const BarcodeScanner = () => {

    const [data, setData] = useState("")
    const naviagte = useNavigate()
    const [items, setItems] = useState([])

    const startScanner = () => {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: document.querySelector('#interactive'), // Target element
                constraints: {
                    facingMode: "environment" // Use the back camera
                }
            },
            decoder: {
                readers: ["code_128_reader"] // Add other readers as needed
            }
        }, function(err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
        });

        // Register the onDetected event
        Quagga.onDetected(function(result) {
            const code = result.codeResult.code;
            console.log(data, "dataaaaa")
            console.log(`Code detected: ${code}`);
            document.getElementById('result').innerText = `Scanned Code: ${code}`;
            
            // Stop scanning after a successful scan
            Quagga.stop();
            setData(code)
        });

    }
    
    useEffect(() => {
        // Initialize Quagga
        

        startScanner();

        

        // Cleanup function to stop Quagga when component unmounts
        // return () => {
        //     Quagga.stop();
        // };
    }, []); // Empty dependency array to run only on mount

    useEffect(() => {
        if(data.length > 0)
        {
            const fetchdata = async(res, req) => {
                console.log(data, "inside function")
                const response = await fetch("http://localhost:5000/api/auth/scanproduct", {
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({data: data})
                })
                const message = await response.json();
                console.log(message)

                if(message.productname)
                {
                    setItems([...items, message.productname])
                    
                }
            }

            
            fetchdata()
        }
        
    }, [data])

    const handleClick = () => {
        setData("")
        startScanner()
    }

    useEffect(() => {
        console.log(items)
    }, [items])

    return (
       <>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
            <h1>Barcode Scanner</h1>
            <div id="interactive" style={{ width: '600px', height: '400px', border: '1px solid #ccc', marginBottom: '20px' }}></div>
            <div id="result" style={{ marginTop: '20px', fontSize: '1.2em' }}></div>
        </div>
        <button onClick={handleClick}>Scan Again</button>
       </>
        
    );
};

export default BarcodeScanner;
