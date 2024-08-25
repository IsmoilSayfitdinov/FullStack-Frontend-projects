import { useState } from "react";
import "../login/Login.scss";
import { instance } from "../../../api/Axios";
import { Navigate } from 'react-router-dom';
function ResendCode() {
    const [email, setEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await instance.post('api/v2/users/password/forget/', {
                email: email,
            });
            const token = response.data.access_token;
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="Login_main">
           <div className="login_text">
            <h1>Login</h1>
           </div>
           <div className="login_inp">
               <input
                   onChange={(e) => setEmail(e.target.value)}
                   value={email}
                   type="email"
                   placeholder="Email"
               />
               
               <button onClick={handleLogin}>Login</button>
           </div>
        </div>
    );
}

export default ResendCode;
