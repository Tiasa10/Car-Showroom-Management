import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const handleLogin = () => {

        if (
            email === "admin@gmail.com"
            &&
            password === "admin123"
        ) {

            localStorage.setItem(
                "isLoggedIn",
                true
            );

            window.location.href = "/";

        } else {

            alert("Invalid Credentials");

        }

    };

    return (

        <>

        <div className="login-page">
        
            <div className="login-left">
        
                <h1>
        
                    AutoElite
        
                </h1>
        
                <p>
        
                    Premium Vehicle
                    Management System
        
                </p>
        
            </div>
        
            <div className="login-right">
        
                <div className="login-card">
        
                    <h2>
        
                        Welcome Back
        
                    </h2>
        
                    <p>
        
                        Login to continue
                        managing your fleet
        
                    </p>
        
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />
        
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />
        
                    <button
                        onClick={handleLogin}
                    >
        
                        Login
        
                    </button>
        
                </div>
        
            </div>
        
        </div>
        
        </>
    );

}

export default Login;