import { useEffect, useState } from "react";
import Navbar from "../navbar/Nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Shop.scss";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
function Shop() {
    const [products, setProducts] = useState([]);
    const [cate, setCate] = useState([]);
    const [tags, setTags] = useState([]);
    const [comp, setComp] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [selectedComp, setSelectedComp] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [id, setid] = useState("");
    // Fetch categories
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v2/products/categories/')
            .then(response => response.json())
            .then(data => setCate(data));
    }, []);

    // Fetch tags
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v2/products/tags/')
            .then(response => response.json())
            .then(data => setTags(data));
    }, []);

    // Fetch companies
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v2/products/companeya/')
            .then(response => response.json())
            .then(data => setComp(data));
    }, []);

    // Fetch products with filters
    useEffect(() => {
        let url = 'http://127.0.0.1:8000/api/v2/products/list/';
        const params = new URLSearchParams();

        if (selectedCategory) params.append('category', selectedCategory);
        if (selectedTag) params.append('tag', selectedTag);
        if (selectedComp) params.append('company', selectedComp);
        if (searchTerm) params.append('search', searchTerm);

        if (params.toString()) url += `?${params.toString()}`;

        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setProducts(data));
    }, [selectedCategory, selectedTag, selectedComp, searchTerm]);


    const handleAddToCart = () => {
        fetch(`http://127.0.0.1:8000/api/v2/products/cart/add/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ product_id: `${id}`, quantity: "1" })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    };  

    console.log(id);
    return (
        
        <>
            <Navbar />

            <div className="shop_main">
                <div className="sidebar">
                    <div className="search_sidebar">
                        <input
                            type="text"
                            placeholder="Search.."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                    </div>

                    <div className="cate_cate">
                        <h2>Category</h2>
                        <ul>
                            {cate.map(c => (
                                <li
                                    onClick={() => setSelectedCategory(c.id)}
                                    key={c.id}
                                >
                                    {c.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="tags_tag">
                        <h2>Tags</h2>
                        <ul>
                            {tags.map(t => (
                                <li
                                    onClick={() => setSelectedTag(t.id)}
                                    key={t.id}
                                >
                                    {t.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="companeya_name">
                        <h2>Company</h2>
                        <ul>
                            {comp.map(c => (
                                <li
                                    onClick={() => setSelectedComp(c.id)}
                                    key={c.id}
                                >
                                    {c.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="products">
                    <h2>Products</h2>

                    <div className="product_list">
                        {products.length > 0 ? (
                            products.map(p => (
                                <div key={p.id} className="product">
                                    <Link to={`/shop/${p.id}`}><img
                                        src={p.photo}
                                        alt={p.name}
                                        className="product_img"
                                    /></Link>
                                    <p className="product_name">{p.name}</p>
                                    <p className="product_price">{p.discounted_price} $ / <strike>{p.price} $</strike> <FontAwesomeIcon onClick={() => {
                                        setid(p.id); 
                                        handleAddToCart();
                                    }} className="add-cart" icon={faAdd} /></p>
                                   
                                </div>
                            ))
                        ) : (
                            <p className="no-products">No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Shop;
