import { useState, useEffect } from "react"
import "./Create.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Create() {
    const [tags, setTags] = useState([])
    const [companies, setCompanies] = useState([])
    const [categories, setCategories] = useState([])
    const [subcategory, setSubcategory] = useState([])

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState(null)
    const [category, setCategory] = useState(0)
    const [subcategory_id, setSubcategory_id] = useState(0)
    const [company_id, setCompany_id] = useState(0)
    const [tags_id, setTags_id] = useState(0)
    const [quantitiy, setQuantitiy] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [created, setCreated] = useState(false)
    const notify = () => toast("Siz muvaffaqqiyatli yaratdingiz");
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v2/products/tags/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setTags(data))
    }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v2/products/categories/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setCategories(data))
    }, [])


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v2/products/companeya/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setCompanies(data))
    }, [])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/v2/products/subcategories/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => response.json())
            .then(data => setSubcategory(data))
    }, [])

    const handleFileChange = (e) => {
            setImage(e.target.files[0]);
            console.log(image);
    };

    const createProduct = async () => {
        if (!category || !subcategory_id) {
            console.error('Category va Subcategory majburiy maydonlar.');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('photo', image);
        formData.append('category', parseInt(category, 10)); // Integerga o'zgartiring
        formData.append('subcategory', parseInt(subcategory_id, 10)); // Integerga o'zgartiring
        formData.append('company_id', parseInt(company_id, 10)); // Integerga o'zgartiring
        formData.append('quantity', parseInt(quantitiy, 10)); // Integerga o'zgartiring
        formData.append('discount', parseInt(discount, 10)); // Integerga o'zgartiring
        formData.append('tags_id', JSON.stringify(tags_id)); // Agar tags_id array bo'lsa
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/v2/products/add/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            setCreated(true);
            console.log(data);
        } catch (error) {
            console.error('Xatolik:', error);
        }
    };
    



    return (
        
        <div className="create_main">
            {created && notify()}
            <div className="create_name">
                <h2>Mahsulot qoshish</h2>
            </div>
            <div className="create">
                <input className="create_inp_name" type="text" placeholder="Mahsulot nomi" value={name} onChange={(e) => setName(e.target.value)}/>
                <input className="create_inp_name" type="text" placeholder="Mahsulot xaqida malumot" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className="create_quantitiy_price">
                <div className="create_quantitiy">
                    <input type="number" placeholder="Mahsulot soni" value={quantitiy} onChange={(e) => setQuantitiy(e.target.value)}/>
                </div>
                <div className="create_price">
                    <input type="number" placeholder="Mahsulot narxi" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className="create_discount">
                    <input type="number" placeholder="Mahsulot chegirma" value={discount} onChange={(e) => setDiscount(e.target.value)}/>
                </div>
            </div>

            <div className="tags_category_subcategory_create">
                <div className="tags">
                    <select onChange={(e) => setTags_id(e.target.value)}>
                        {tags.map(tag => (
                            <option  key={tag.id} value={tag.id} >{tag.name}</option>
                        ))}
                    </select>
                </div>
                <div className="category">
                    <select onChange={(e) => setCategory(e.target.value)}>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                <div className="subcategory">
                    <select onChange={(e) => setSubcategory_id(e.target.value)} name="" id="">
                        {subcategory.map(subcategory => (
                            <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>
                    </div>
                <div className="componeya">
                    <select onChange={(e) => setCompany_id(e.target.value)} name="" id="">
                        {companies.map(company => (
                            <option key={company.id} value={company.id}>{company.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="image-upload">
            <label className="image-upload-label">
                <FontAwesomeIcon icon={faCloudUploadAlt} />
                <span>Upload Image</span>
                <input
                    onChange={handleFileChange}
                    type="file"
                    className="image-upload-input"
                />
            </label>
        </div>
        <button className="create_btn" onClick={createProduct}>Saqlash</button>
        <ToastContainer />
        </div>
    )
}

export default Create