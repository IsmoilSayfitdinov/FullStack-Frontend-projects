import { useState } from "react";
import "../login/Login.scss";
import { instance } from "../../../api/Axios";
import { Navigate } from 'react-router-dom';
import { Link } from "react-router-dom";
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await instance.post('api/v2/users/login/', {
                username,
                password
            });
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

    return (
        <div className="Login_main">
           <div className="login_text">
            <h1>Login</h1>
           </div>
           <div className="login_inp">
               <input
                   onChange={(e) => setUsername(e.target.value)}
                   value={username}
                   type="text"
                   placeholder="Username"
               />
               <input
                   onChange={(e) => setPassword(e.target.value)}
                   value={password}
                   type="password"
                   placeholder="Password"
               />
               <button onClick={handleLogin}>Login</button>
               <p className="register">Dont have an account? <a href="/register">Register</a></p>
               <p className="forget"><Link to="/forget">Forget Password</Link></p>
           </div>
        </div>
    );
}

export default Login;
