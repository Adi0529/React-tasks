import { useContext, useState} from "react";
import {CartContext} from "../Context/Context.jsx";
import Navbar from "../Components/Navbar";
import { ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Required styles
import { toast } from 'react-toastify';

const ProductCard = ({ products }) => {
  const[searchTerm, setSearchTerm] = useState("");
  const { cart, setCart } = useContext(CartContext);
  const handleAddToCart = (product) => {
   const isAlreadyInCart = cart.some((item) => item.id === product.id);

  if (isAlreadyInCart) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === product.id 
          ? { ...item, quantity: (item.quantity || 1) + 1 } 
          : item
      )
    );
    toast.info("Increased product quantity in your cart.");
  } else {
    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    toast.success("Success! The Product was added to cart.");
  }
  }
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <Navbar />
      <div className="mx-auto my-3" style={{"width": "500px"}}>
      <form className="d-flex" role="search">
        <input className="form-control me-2" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} type="search" placeholder="Search" aria-label="Search"/>
      </form>
      </div>
      <div className="container my-3 d-flex flex-wrap justify-content-center gap-5">
        {filteredProducts.map((product,i) => (
          <div className="card" key={i}  style={{"width": "18rem"}}>
            <img src={product.image} className="p-5 card-img-top" style={{"height": "300px"}} alt={product.title} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description.slice(0, 100)}...</p>
                <a href="#" className="btn btn-primary" onClick={()=>handleAddToCart(product)}>Add to Cart</a>
              </div>
          </div>
        )
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default ProductCard;