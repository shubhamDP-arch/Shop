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


    const handleSignUpSubmit = (event) => {
        event.preventDefault();
        
        if (!isSubmitted) {
            setIsSubmitted(true)
            console.log("First SignUp submission, awaiting OTP.")
            setOtp(true)
        } else if (isOtp) {
            console.log("SignUp form submitted with OTP:", formData)
            navigate("/Homepage")
        }
    };


    const handleLoginSubmit = (event) => {
        event.preventDefault();
        
        console.log("Login form submitted:", formData)
        navigate("/Homepage")
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }))
    };

    const handleFormSubmit = (event) => {
        if (action === "SignUp") {
            handleSignUpSubmit(event);
        } else {
            handleLoginSubmit(event)
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
                <form method="post" action="#" onSubmit={handleFormSubmit}>
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
                            <>
                                <div className="input">
                                    <input
                                        type="phone"
                                        placeholder="Phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </>
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
                        <button type="button" className="btnSubmit" onClick={handleFormSubmit}>
                            {isOtp && action === "SignUp" ? "Submit OTP" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
