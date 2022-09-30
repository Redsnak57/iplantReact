import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Product from './components/Product';
import {useState} from 'react';
import AddProduct from './components/AddProduct';
import UpdateProduct from "./components/UpdateProduct";



function App() {

  const [cart, setCart] = useState([]);

  return (
    <>
    <Router>
      <Navbar />
      
        <div className='layout'>
          <Routes>
            <Route exact path='/' element={<>
                <Cart cart={cart} setCart={setCart}/>
                <Product cart={cart} setCart={setCart} />
              </> } />
            <Route exact path='/product/add' element={< AddProduct />}></Route>
            <Route path="/products/update/:ID" element={<UpdateProduct />}/>
          </Routes>
        </div>

    </Router>
  </>
  );
}

export default App;
