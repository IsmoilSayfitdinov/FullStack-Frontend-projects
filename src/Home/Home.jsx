import "./Home.scss"
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import banner from "../image/pngtree-empty-shopping-basket-on-wood-table-over-grocery-store-supermarket-blur-image_15653639.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // swiper kutubxonasi css fayl import qilinadi
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import "swiper/css/autoplay"
import { faLocation } from "@fortawesome/free-solid-svg-icons";
import imageGallery1 from "../image/river1.jpg"
import imageGallery2 from "../image/river2.jpg"
import imageGallery3 from "../image/river3.jpg"
import imageGallery4 from "../image/river4.jpg"
import { useEffect, useState } from "react";
import banner2 from "../image/banner_tabla_jamon_queso_945x234_e.jpg"
import banner3 from "../image/helados_mmpp_cas.jpg"
import {instance} from "../../api/Axios";
import Navbar from "../components/navbar/Nav";
import { Link } from "react-router-dom";
function Home(){
    const [products, setProducts] = useState([])
    

    useEffect(() => {
     instance.get("api/v2/products/list/")
        .then(response => setProducts(response.data))
        .catch(error => console.log(error))
    }, [])

    useEffect(() => {
        instance.get("api/v2/products/cart/", {
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
    }, [])


    return (
        <>
            <Navbar></Navbar>
        
        <div className="banner">
       
        <div className="img-banner">
        <div className="img-text">

            <h2>Riverside</h2>
            <p className="supermarket">supermarket</p>
            <p>Juda ham katta bolgan supermarketga hush kelibsiz bu yerda supermarket haqida malumot olasiz</p>
        
            <button>Biz bilan boglasnish</button>

        </div>
        <img src={banner} alt="" />

        </div>
        </div>

        <div className="producst-main">
            <div className="filial">
                <FontAwesomeIcon icon={faLocation} className="filial_icon"/>
                <h2>Chilonzor Filial</h2>
            </div>
            <div className="filial">
                <FontAwesomeIcon icon={faLocation}  className="filial_icon"/>
                <h2>Yashnabod Filial</h2>
            </div>
        </div>

        <div className="Galerry_corusel">
        <Swiper
            autoplay={{ delay: 2500}}
            spaceBetween={30}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            loop={true}
            >
            <SwiperSlide>
                <img src={imageGallery1} alt="Image 1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={imageGallery2} alt="Image 2" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={imageGallery3} alt="Image 3" />
            </SwiperSlide>
            <SwiperSlide>
                <img src={imageGallery4} alt="Image 3" />
            </SwiperSlide>
        </Swiper>
        </div>
        <div className="gallery_two">
            <div className="g2">
                <img src={banner2} alt="" />
            </div>
            <div className="g2">
                <img src={banner3} alt="" />
            </div>
        </div>
        <div className="list_products_home">
            {products.slice(0, 5).map(product => (
                 <div key={product.id} className="cart-item">
                    <Link to={`shop/${product.id}`}><img src={product.photo} alt={product.name} className="cart-item-image" /></Link>
                 <div className="cart-item-details">
                   <h2 className="cart-item-title">{product.name}</h2>
                   <p className="cart-item-discounted-price">{product.discounted_price} /<s> {product.price} €</s></p>
                   <Link to={`shop/${product.id}`}><button className="cart-item-button">Qoshish</button></Link>
                 </div>
               </div>
            ) )}
          
        </div>
        <div className="learnmore">
               <Link to={"/shop"}><button>Leran More</button></Link>
           </div>

        <div className="footer">
            <div className="footer-text">
                <p>© 2023 Riverside. All rights reserved.</p>
            </div>
            <div className="search">
                <input type="text" placeholder="Search.." name="search"/>
                <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            </div>
        </div>
        </>
    )
}


export default Home
