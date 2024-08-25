import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import "./Nav.scss"
import { useEffect, useState } from 'react';
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faSortDown } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; 
const delet  = [
    "/shop"
]

function Navbar(){

    const [cartItems, setCartItems] = useState([]);
    const [show, SetShow] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subcategories, setSubcategories] = useState([]);
    const [category, setcategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    console.log(products, selectedCategory, subcategories, selectedSubcategory);


    const [inpSearch, setInpSearch] = useState("");
    const [seacrResult, setSeacrResult] = useState([]);
    const [showNoResult, setShowNoResult] = useState(true);
    
    const [showResults, setShowResults] = useState(false);
    const [helpersuser, setHelpersuser] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Tokenni localStorage'dan olish

       

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
            // Adminligini tekshirish
            setIsAdmin(data.is_superuser);
        })
        
    }, [token]);




  // Qidiruv maydonidagi o'zgarishlarni boshqarish
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setInpSearch(value);
    // Agar qidiruv maydoni bo'sh bo'lsa, natijalarni ko'rsatmasin
    setShowResults(value.trim() !== '');
  };

    const hideNoResult = () => {
        setShowNoResult(false);
        setInpSearch("")
      };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v2/products/?q=${inpSearch}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }

        })
            .then(response => response.json())
            .then(data => setSeacrResult(data.results))
            .catch(error => console.error('Error:', error));
    }, [inpSearch])
    console.log(seacrResult);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v2/products/cart/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setCartItems(data[0].items))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v2/products/categories/", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setcategory(data))
            .catch(error => console.error('Error:', error));
    }, []);
    console.log(category);

    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setSelectedSubcategory(null);
        axios.get(`/api/v2/products/subcategories/?category=${categoryId}`)
            .then(response => setSubcategories(response.data))
            .catch(error => console.error('Error fetching subcategories:', error));
    };

    const handleSubcategoryClick = (subcategoryId) => {
        setSelectedSubcategory(subcategoryId);
        axios.get(`/api/v2/products/?category=${selectedCategory}&subcategory=${subcategoryId}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    };

    return(
        <>
        <div className="NavbarTopMain">
                <div className="supportUsers">
                    <FontAwesomeIcon icon={faMicrophone} className='microphone' />
                    <h2 className='support_user'>
                        Mijozlarni qolla-quvatlash <FontAwesomeIcon onClick={() => setHelpersuser(!helpersuser)} className='chevron' icon={helpersuser ? faChevronUp : faChevronDown}/></h2>
                    {helpersuser ? <div className="supportView">
                        <div className="helpers">
                            <p>Tel: +998 99 999 99 99</p>
                        </div>
                        <div className="helpers">
                            <p>Emial: UHqZ3@example.com</p>
                        </div>
                        <div className="helpers">
                            <p>Support Chat</p>
                        </div>
                    </div> : null}
                </div>
                <div className="dastavaka_narxi">
                    <FontAwesomeIcon icon={faTruck} className='truck'/>
                    <h2>Yetkazib berish narxi: 300.000 som dan ortiq zakaz uchun 15.000 som</h2>
                </div>
                <div className="navItems">
                    <Link to="/register"><button className="navButton">Register</button></Link>
                    {token ? (
                        <Link to="/login"><button className="navButton">Logout</button></Link>   
                    ): (
                        <Link to="/login"><button className="navButton">Login</button></Link>
                    )}
                </div>
            </div>
        <div className="navbar">
            <div className="navContainer">
                <span className="logo">Riverside</span>

                {delet.includes(location.pathname) ? (
                    <></>
                ) : (
                    <div className="saidabar_category" onClick={() => SetShow(!show)}>
                        <FontAwesomeIcon icon={faBars} className='bars'/>
                        <h2>Category</h2>
                    </div>
                )}

                <div className="nav-serach">
                    <input type="text" placeholder="Search.." name="search" value={inpSearch} onChange={handleSearchChange}/>
                    {showNoResult ? (
                        <button  onClick={hideNoResult} type="submit"><FontAwesomeIcon icon={faClose}/></button>
                    ) : (
                        <button onClick={hideNoResult} type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    )}
                </div>
                {showResults &&  (
                    <div className="seacrh_results">
                        {seacrResult.length > 0 ? (
                            seacrResult.map(pro => (
                                <div key={pro.id}>
                                    <Link to={`/shop/${pro.id}`}>
                                         <img src={pro.photo} alt="" />
                                        <h2>{pro.name}</h2>
                                        <p>{pro.price} $</p>
                                    </Link>
                                </div>
                            ))
                        ): (
                            <p className='no_result'>No results found</p>
                        )}
                 </div>
                )}

                <div className="navTextList">
                    <ul>
                        <li><Link  to={"/"}>Home</Link></li>
                        <li><Link  to={"/shop"}>Shop</Link></li>
                        {isAdmin ? (
                        <li><Link  to={"/admin/add-products/"}>Admin</Link></li>

            ) : (
                <></>
            )}
                    </ul>
                </div>

                

                <Link to={"/cart"}>
                <div className="cart-nav">
                    <FontAwesomeIcon className="cart" icon={faShoppingCart} />
                    <span className="cart-count">{cartItems.length}</span>
                </div>
                </Link>
            </div>
        </div>
        <div className={show ? "showAside" : "hideaside"}>
            <div onClick={() => SetShow(!show)} className="aside-back">
            </div>
            <div className="aside">
                <h2 onClick={() => SetShow(!show)} className='closeAside'>X</h2>

                <div className="categories">
                    <h2>Categories</h2>
                    <ul>
                {category.map(cate => (
                    <li key={cate.id} onClick={() => handleCategoryClick(cate.id)}>
                        {cate.name }
                        <FontAwesomeIcon  className='sort-down' icon={faSortDown} />
                        {selectedCategory === cate.id && (
                            <ul>
                                {cate.subcategories.map(subcategory => (
                                    <li onClick={() => handleSubcategoryClick(subcategory.id)} key={subcategory.id}>{subcategory.name}</li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar