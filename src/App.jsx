import { useEffect } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homes from './Home/Home'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Verify from './components/verify/Verify'
import ResendCode from './components/resendcode/ResendCode'
import Shop from './components/shop/Shop'
import DetailShop from './components/shop_view/DetalShop'
import Cart from './components/cart/Cart'
import Checkout from './components/checkout/Order'
import CheckAdmin from './components/admin/Admin'
import Create from './components/CreateProduct/Create'
import ProductSetting from './components/productsSetting/ProductsSetting'
import GetUser from './components/GetUser/GetUsers'
function App() {

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/v2/products/list/')
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])

  return (
    <div className='container'>
      <Routes>
        <Route path='/home' element={<Homes/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/forget' element={<ResendCode/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/shop/:id' element={<DetailShop/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout/:id' element={<Checkout/>}/>
        <Route path='/admin/' element={<CheckAdmin/>}>
          <Route path='add-products' element={<Create/>}/>
          <Route path='products-setting' element={<ProductSetting/>}/>
          <Route path='get-users' element={<GetUser/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
