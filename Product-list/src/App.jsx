
import { useEffect, useState } from 'react';
import './App.css'
import {CartContext} from './Context/Context.jsx';
import ProductCard from './Pages/Productcard'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Addtocart from './Pages/Addtocart.jsx';
function App() {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);
    
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await fetch("https://fakestoreapi.com/products");
          const data = await res.json();
          setProducts(data);
        } catch (error) {
          setErr(true);
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }, []);
    if (loading) return <div>Loading...</div>;
    if (err) return <div>Error loading data.</div>;
  

  return (
    <>
    <CartContext.Provider value={{cart, setCart}}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductCard products={products} />} />
        <Route path="/cart" element={<Addtocart />} />
      </Routes>
     </BrowserRouter>
    </CartContext.Provider>
    </>
  )
}

export default App
