// Cart.jsx
import { useEffect, useState } from "react";
import "./Cart.scss";
import Navbar from "../navbar/Nav";
import { Link } from "react-router-dom";
function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v2/products/cart/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setCartItems(data[0]))
            .catch(error => console.error('Error:', error));
    }, []);
    console.log(cartItems);

    const handleRemove = (id) => {
        fetch(`http://127.0.0.1:8000/api/v2/products/cart/remove/${id}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setCartItems(data))
            .catch(error => console.error('Error:', error));
    };

    return (
        <>
        <Navbar/>
        <div className="cart_cart">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="ul">
                    {cartItems?.items.map(item => (
                        <>
                        <div key={item.product.id} className="cart-item">
                            <img src={item.product.photo} alt={item.name} />
                            <div className="item-details">
                                <h2>{item.product.name}</h2>
                                <p className="price">${item.product.price}</p>
                                <p className="quantity">Quantity:{item.quantity}</p>
                            </div>
                            <a href=""><button onClick={() => handleRemove(item.product.id)} className="remove-button">Remove</button></a>
                        </div>
                   </> ))}
                   <Link to={`/checkout/${cartItems.id}`}> <button className="checkout-button">Checkout</button></Link>
                </div>
            )}
        </div>
        </>
    );
}

export default Cart;
