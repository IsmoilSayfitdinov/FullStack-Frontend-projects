import { useState } from "react";
import "../register/Register.scss";
import { instance } from "../../../api/Axios";
import { Navigate } from 'react-router-dom';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [error, setError] = useState(null);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const handleRegister = async () => {
        try {
            const response = await instance.post('api/v2/users/register/', {
                first_name:firstname,
                last_name:lastname,
                email:email,
                username:username,
                password:password,
                confirm_password: confirmPassword
            });
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
            console.log("Error response data:", error.response ? error.response.data : error.message);
        }
    };

    if (isAuthenticated){
        return <Navigate to="/verify" />;
    }

    return (
        <div className="Login_main">
            <div className="login_text">
                <h1>Register</h1>
            </div>
            {error && <div className="error">{JSON.stringify(error)}</div>}
            <div className="login_inp">
                <input
                    onChange={(e) => setFirstname(e.target.value)}
                    value={firstname}
                    type="text"
                    placeholder="First name"
                />
                <input
                    onChange={(e) => setLastname(e.target.value)}
                    value={lastname}
                    type="text"
                    placeholder="Last name"
                />
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    placeholder="Username"
                />
                <div className="password-container">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type={passwordVisible ? "text" : "password"}
                        placeholder="Password"
                    />
                   <span className="eye">
                   <FontAwesomeIcon
                        className="eye1"
                        icon={passwordVisible ? faEyeSlash : faEye}
                        onClick={() => setPasswordVisible(!passwordVisible)}
                    />
                   </span>
                </div>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Email"
                />
                <div className="password-container">
                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        type={confirmPasswordVisible ? "text" : "password"}
                        placeholder="Confirm password"
                        
                    />
                    <span className="eye2"> 
                    <FontAwesomeIcon 
                    
                        icon={confirmPasswordVisible ? faEyeSlash : faEye}
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                    />
                    </span>
                </div>
                <button onClick={handleRegister}>Register</button>
                <p className="login">Already have an account? <Link to="/">Login</Link></p>
            </div>
        </div>
    );
}

export default Register;
