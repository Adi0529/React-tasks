import { CartContext } from '../Context/Context.jsx';
import { useContext } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Addtocart() {
  // 1. Destructure both cart and setCart from your shared global Context
  const { cart, setCart } = useContext(CartContext);

  // Update item quantity directly in the global Context state
  // Automatically removes item from cart if quantity hits 0
  const updateQuantity = (id, amount) => {
    setCart(prevCart => {
      // Find the item to check its current quantity and get its title
      const targetItem = prevCart.find(item => item.id === id);
      if (!targetItem) return prevCart;

      const currentQty = targetItem.quantity || 1;
      const newQty = currentQty + amount;

      // If the quantity drops to 0 or lower, remove the item entirely
      if (newQty <= 0) {
        toast.warning(`${targetItem.title.split(',')[0]} removed from cart`);
        return prevCart.filter(item => item.id !== id);
      }

      // Otherwise, update the quantity of the item
      return prevCart.map(item => 
        item.id === id ? { ...item, quantity: newQty } : item
      );
    });
  };

  // Remove item directly from the global Context state
  const removeItem = (id, title) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
    toast.warning(`${title.split(',')[0]} removed from cart`);
  };

  // Pricing calculations are now performed over the live context array items
  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const tax = subtotal * 0.08; // 8% Tax rate
  const total = subtotal + tax;

  // Checkout handling
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    toast.success("Order placed successfully!");
  };

  return (
    <div className="container my-5">
      <h2 className="border-bottom pb-2 mb-4 text-dark fw-bold">Your Shopping Cart</h2>
      <Link className="btn btn-outline-secondary mb-3" onClick={() => window.history.back()}>
        ← Back to Main
      </Link>
      {cart.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted fs-5">Your cart is empty.</p>
        </div>
      ) : (
        <div className="row g-4">
          
          {/* Cart Items List */}
          <div className="col-lg-8">
            {cart.map(item => (
              <div key={item.id} className="card p-3 mb-3 shadow-sm border border-light-subtle">
                <div className="row align-items-center g-3">
                  
                  {/* Product Image */}
                  <div className="col-4 col-sm-2 text-center">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="img-fluid" 
                      style={{ maxHeight: '90px', objectFit: 'contain' }} 
                    />
                  </div>
                  
                  {/* Details */}
                  <div className="col-8 col-sm-5">
                    <h5 className="fs-6 text-dark mb-1 text-truncate">{item.title}</h5>
                    <span className="badge bg-secondary mb-2 text-uppercase" style={{ fontSize: '0.65rem' }}>
                      {item.category}
                    </span>
                    <p className="fw-bold text-secondary mb-0">${item.price.toFixed(2)}</p>
                  </div>
                  
                  {/* Quantity Controls & Actions */}
                  <div className="col-12 col-sm-5 d-flex align-items-center justify-content-sm-end gap-2">
                    <div className="input-group input-group-sm" style={{ maxWidth: '110px' }}>
                      <button 
                        className="btn btn-outline-secondary" 
                        onClick={() => updateQuantity(item.id, -1)}
                      >-</button>
                      <span className="input-group-text bg-white fw-bold justify-content-center flex-grow-1">
                        {item.quantity || 1}
                      </span>
                      <button 
                        className="btn btn-outline-secondary" 
                        onClick={() => updateQuantity(item.id, 1)}
                      >+</button>
                    </div>
                    
                    <button 
                      className="btn btn-danger btn-sm px-3" 
                      onClick={() => removeItem(item.id, item.title)}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="col-lg-4">
            <div className="card p-4 bg-light shadow-sm border-0">
              <h3 className="fs-5 fw-bold mb-4 text-dark">Order Summary</h3>
              
              <div className="d-flex justify-content-between mb-2 text-muted">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-3 text-muted">
                <span>Estimated Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <hr className="my-3 text-muted" />
              
              <div className="d-flex justify-content-between mb-4 fs-5 fw-bold text-dark">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <button className="btn btn-primary w-100 py-2 fw-bold" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Your exact configured ToastContainer */}
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
    </div>
  );
}

export default Addtocart;
