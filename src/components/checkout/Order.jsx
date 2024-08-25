// Checkout.jsx
import { useState } from 'react';
import './Order.scss';
import { useParams } from 'react-router-dom';
import Navbar from '../navbar/Nav';
const Checkout = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const  cartId  = useParams();

    const handleCheckout = () => {
        setLoading(true);
        fetch(`http://127.0.0.1:8000/api/v2/products/cart/${cartId.id}/checkout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                phone_number: phoneNumber,
                address: address
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to checkout');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <>
        <Navbar/>
        <div className="checkout">
            <h2>Checkout</h2>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button
                onClick={handleCheckout}
                disabled={loading}
            >
                {loading ? 'Processing...' : 'Checkout'}
            </button>
        </div>
        </>
    );
};

export default Checkout;
