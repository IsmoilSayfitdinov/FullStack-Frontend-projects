import { useState } from "react";
import "../login/Login.scss";
import { instance } from "../../../api/Axios";
import { Navigate } from 'react-router-dom';
function Verify() {

    const [code, setCode] = useState('');

    const handleLogin = async () => {
        const token = localStorage.getItem('token');

    try {
        const response = await instance.post('api/v2/users/verify/', 
            {
                code
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        
        // Yangi tokenni saqlash
        const newToken = response.data.access_token;
        localStorage.setItem('token', newToken);

    } catch (error) {
        console.log(error);
    }
};

    if (localStorage.getItem('token')) {
        return <Navigate to="/" />;
    }

    return (
        <div className="Login_main">
           <div className="login_text">
            <h1>Verify Code</h1>
           </div>
           <div className="login_inp">
               <input
                   onChange={(e) => setCode(e.target.value)}
                   value={code}
                   type="number"
                   placeholder="Verify Code"
               />
               
               <button onClick={handleLogin}>Send</button>
           </div>
        </div>
    );
}



export default Verify