import { useEffect, useState } from 'react';
import "./Admin.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShop, faPlus, faUser, faBorderAll,  } from '@fortawesome/free-solid-svg-icons';
import avatar from "../../image/6830335.png"
import { Link, Outlet, useNavigate  } from 'react-router-dom';
const CheckAdmin = () => {
    const [admin, setAdmin] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');

      

        // Foydalanuvchi ma'lumotlarini olish
        fetch('http://127.0.0.1:8000/api/v2/users/me/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            return response.json();
        })
        .then(data => {
            setAdmin(data);
        })
        
    }, []);

    
   

    return admin.is_superuser ? (
        <div className='admin_main'>
            <div className="admin_saidbar">
                <div className="admin_about">
                    {admin.avatar ? (
                        <img src={admin.avatar} alt="" />

                    ): (
                        <img src={avatar} alt="" />

                    )}
                    <div className="admin_name">
                        <h1>{admin.username}</h1>
                        <span>Admin</span>
                    </div>
                </div>
                <div className="admin_tools">
                    <ul>
                        <Link to={"/admin/add-products"}><li><FontAwesomeIcon icon={faPlus} /> Mahsulot yaratish</li></Link>
                       <Link to={"/admin/products-setting"}> <li><FontAwesomeIcon icon={faShop} /> Mahsulot royhati</li></Link>
                        <Link to={"/admin/get-users"}><li><FontAwesomeIcon icon={faUser} /> Foydalanuvchilarni olish</li></Link>
                        <li><FontAwesomeIcon icon={faBorderAll} /> Buyurtmalar royhati</li>

                    </ul>
                </div>
                <div className="exit_admin_panel">
                    <button>Chiqish</button>
                </div>
            </div>
            <Outlet/>
        </div>
    ) : (
        navigate('/')
    )
};

export default CheckAdmin;
