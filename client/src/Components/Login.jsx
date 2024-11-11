import React, { useState } from "react";
import '/styles/loginStyle.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    
    const [action, setAction] = useState("SignUp");
    const [isOtp, setOtp] = useState(false);
    const [formData, setFormData] = useState({
        role: "admin",
        name: "",
        email: "",
        phone: "",
        shopID: "",
        password: "",
        otp: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        
        if (!isSubmitted) {
           
            try {
                const response = await fetch('/api/auth/sign-up/Admin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                console.log(response)
                const data = await response.json();
                if (response.ok) {
                    console.log("First SignUp ");
                    setIsSubmitted(true);
                    setOtp(true);
                } else {
                    console.log("Error in SignUp:", data.message);
                }
            } catch (error) {
                console.error("SignUp Error:", error);
            }
        } else if (isOtp) {
            // OTP Verification request
            // try {
            //     const response = await fetch('/api/auth/verify-otp', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json'
            //         },
            //         body: JSON.stringify({ email: formData.email, otp: formData.otp })
            //     });

                const data = await response.json();
                if (response.ok) {
                    console.log("SignUp form submitted with OTP:", data);
                    navigate("/Homepage");
                } else {
                    console.log("Invalid OTP:", data.message);
                }
            // } catch (error) {
            //     console.error("OTP Verification Error:", error);
            // }
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('/api/auth/login/Admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Login successful:", data);
                navigate("/Homepage");
            } else {
                console.log("Login failed:", data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (event) => {
        if (action === "SignUp") {
            handleSignUpSubmit(event);
        } else {
            handleLoginSubmit(event);
        }
    };

    return (
        <div className="main1">
            <video autoPlay loop muted playsInline className="back-video">
                <source src="/87789-602074264_small.mp4" type="video/mp4" />
            </video>
            <div className="Container">
                <div className="Header">
                    <div className="text">{action}</div>
                    <div className="underLine"></div>
                </div>
                <form method="post" onSubmit={handleFormSubmit}>
                    <div className="radioInput">
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={formData.role === "admin"}
                                onChange={handleInputChange}
                            />
                            Admin
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="employee"
                                checked={formData.role === "employee"}
                                onChange={handleInputChange}
                            />
                            Employee
                        </label>
                    </div>
                    <div className="inputs">
                        {action === "Login" ? null : (
                            <div className="input">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <div className="input">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        {action === "Login" ? null : (
                            <div className="input">
                                <input
                                    type="text"
                                    placeholder="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    {isOtp && action === "SignUp" ? (
                        <div className="Otp">
                            <p>OTP has been sent to the registered Email ID.</p>
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter 4-digit OTP"
                                value={formData.otp}
                                onChange={handleInputChange}
                            />
                        </div>
                    ) : (
                        <div className="Submitcontainer">
                            <div
                                className={action === "Login" ? "submit gray" : "submit notGray"}
                                onClick={() => setAction("SignUp")}
                            >
                                Signup
                            </div>
                            <div
                                className={action === "SignUp" ? "submit gray" : "submit notGray"}
                                onClick={() => setAction("Login")}
                            >
                                Login
                            </div>
                        </div>
                    )}
                    <div className="formSubmit">
                        <button type="submit" className="btnSubmit">
                            {isOtp && action === "SignUp" ? "Submit OTP" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
