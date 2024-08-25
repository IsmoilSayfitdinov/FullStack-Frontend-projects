import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.scss";
import Navbar from "../navbar/Nav";

function DetailShop() {
    const { id } = useParams(); // URL parametrlari orqali ID olish
    const [product, setProduct] = useState(null); // Mahsulotni saqlash uchun holat
    const [quantity, setQuantity] = useState(1); // Mahsulot miqdorini saqlash
    const [loading, setLoading] = useState(true); // Yuklanish holatini kuzatish
    const [error, setError] = useState(null); // Xatoliklarni saqlash

    const token = localStorage.getItem('token'); // Tokenni olish
    useEffect(() => {
        if (!token) {
            console.error('Token not found in localStorage');
            return;
        }

        fetch(`http://127.0.0.1:8000/api/v2/products/${id}/detail/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [id, token]);

    const handleAddToCart = () => {
        fetch(`http://127.0.0.1:8000/api/v2/products/cart/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ product_id: id, quantity })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };

    const handleUpdateQuantity = (action) => {
        setQuantity(prevQuantity => {
            if (action === 'plus') {
                return prevQuantity + 1;
            }
            if (action === 'minus' && prevQuantity > 1) {
                return prevQuantity - 1;
            }
            return prevQuantity;
        });
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <>
        <Navbar></Navbar>
            <div className="detail-shop">
            {product ? (
                <div className="product-detail">
                    <h1 className="product-title">{product.name}</h1>
                    <div className="product-image">
                        <img src={product.photo} alt={product.name} />
                    </div>
                    <div className="product-description">
                        <p>{product.description}</p>
                    </div>
                    <div className="product-price">
                        <p>${product.price.toFixed(2)}</p>
                    </div>
                    <div className="quantity-controls">
                        <button onClick={() => handleUpdateQuantity('minus')}>-</button>
                        <span>{quantity}</span>
                        <button onClick={() => handleUpdateQuantity('plus')}>+</button>
                    </div>
                    <button onClick={handleAddToCart} className="add-to-cart-button">Add to Cart</button>
                </div>
            ) : (
                <div className="no-product">Product not found</div>
            )}
        </div>
        </>
    );
}

export default DetailShop;
