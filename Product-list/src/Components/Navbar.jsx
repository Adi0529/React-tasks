import { useContext } from "react";
import { CartContext } from "../Context/Context.jsx";
import { Link } from "react-router-dom";
export default function Navbar() {
    const { cart } = useContext(CartContext);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav list-unstyled me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                            </li>
                        </ul>
                        
                        <li className=" fs-1 list-unstyled nav-item">
                            <Link className="fs-3 nav-link text-decoration-none" to="/cart">
                                <i className="fs-3 bi bi-cart-fill me-3"><sup className="fs-6 translate-middle badge rounded-pill bg-danger">{cart.length}+</sup></i> 
                            </Link>
                        </li>

                    </div>
                </div>
            </nav>
        </>
    )
}