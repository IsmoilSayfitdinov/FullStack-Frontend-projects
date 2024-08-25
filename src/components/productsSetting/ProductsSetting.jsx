import "./ProductsSetting.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import notfound from "../../image/6261498.png"
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons"
function ProductSetting() {
    const [products, setProducts] = useState([])
    const [searchfilter, setSearchfilter] = useState([])
    const [showUpdate, setShowUpdate] = useState(false)

    const [prName, setPranme ] = useState("")
    const [prDesc, setPrDesc] = useState("")
    const [prPrice, setPrice] = useState(0)
    const [prDiscount, setPrdiscount] = useState(0)
    const [prquintity, setQuantitiy] = useState(0)
    const [category, SetCatergory] = useState(0)
    const [subcategory, setSubcategory] = useState(0)
    const [company, setCompany] = useState(0)
    const [tags, setTags] = useState(0)

    const [idPr, setidPr] = useState('')
    const [image, Steimgae] = useState(null)




    
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/v2/products/?q=${searchfilter}`, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => setProducts(data.results))
    }, [searchfilter])


    const handeledelete = (id) => {
        fetch(`http://127.0.0.1:8000/api/v2/products/${id}/delete/`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }
    const handleUpdate = () => {
        
        setShowUpdate(!showUpdate)
    }

    const UpdatecickerTriger = () => {
        fetch(`http://127.0.0.1:8000/api/v2/products/update/${idPr}/`, {
            method: "PUT",
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body:{
                    "name": prName,
                    'description': prDesc,
                    'price': prPrice,
                    'photo': image,
                    'quantity': prquintity,
                    'discount': prDiscount,
                    'category': category,
                    'subcategory': subcategory,
                    'company': company,
                    'tags': tags
            }
        }, [idPr]) 
    }

    return (
        <div className="proucts-setting-main">
            <h2>Mahsulotlarni boshqarish</h2>
            <div className="search-product">
                <input onChange={e => setSearchfilter(e.target.value)} value={searchfilter} type="text" placeholder="Mahsulotlarni qidirish" />
                <FontAwesomeIcon className="search" icon={faSearch} />
            </div>
            <div className="products-setting">
                {products.length !== 0 ? (
                    products.map(product => (
                        <div className="product" key={product.id}>
                        <img src={product.photo} alt="" />
                        <div className="text-products">
                            <h3>{product.name}</h3>
                            <p>{product.discounted_price} $ / <strike>{product.price} $</strike> </p>
                        </div>
                        <div className="settings">
                            <div className="delete">
                                <a href=""><button onClick={() => handeledelete(product.id)}>Ochirish</button></a>
                            </div>
                            <div className="update">
                                <button onClick={() => {handleUpdate(); setidPr(product.id)}}>O'zgartirish</button>
                            </div>
                        </div>
                    </div>
                   
                ))
                ) : (
                    <img className="notfound" src={notfound} alt="" />
                )}
            </div>
            {showUpdate ? (
                <div className="update_products">
                    <div className="update_products_main">
                        <div className="text-title">
                        <h3>Mahsulotni o'zgartirish</h3>
                        <span onClick={() => setShowUpdate(!showUpdate)}>X</span>
                        </div>
                        <div className="update_inp">
                            <div className="inp_block">
                                <input type="text" onChange={(e) => setPranme(e.target.value)} value={prName} placeholder="Mahsulot nomi" />
                                <input type="text" onChange={(e) => setPrDesc(e.target.value)} value={prDesc} placeholder="Mahsulot izoh"/>
                            </div>
                            <div className="inp_block">
                                <input type="number" onChange={(e) => setPrice(e.target.value)}  placeholder="Mahsulot narxi" />
                                <input type="number" onChange={(e) => setPrdiscount(e.target.value)}  placeholder="Mahsulot chegirmasi"/>
                            </div>
                            <input type="number" onChange={(e) => setQuantitiy(e.target.value)}  placeholder="Mahsulot Soni"/>

                            <div className="inp_block">
                                <input type="number" onChange={(e) => SetCatergory(e.target.value)}  placeholder="Mahsulot Categoryasi"/>
                                <input type="number" onChange={(e) => setSubcategory(e.target.value)} placeholder="Mahsulot Subcategoryasi"/>
                            </div>
                            <input type="number" onChange={(e) => setCompany(e.target.value)}  placeholder="Mahsulot Campaniya ismi"/>
                            <input type="number" onChange={(e) => setTags(e.target.value)}  placeholder="Mahsulot Taglar"/>
                            
                        </div>
                        <div className="image-uploads">
            <label className="image-upload-label">
                <FontAwesomeIcon icon={faCloudUploadAlt} />
                <span>Upload Image</span>
                <input
                    onChange={(e) => Steimgae(e.target.files[0])}
                    type="file"
                    className="image-upload-input"
                />
            </label>
            
        </div>
        <div className="add-button-update">
                <button onClick={UpdatecickerTriger}>Update</button>
            </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default ProductSetting