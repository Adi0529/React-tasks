import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget the CSS!

export default function Register() {
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [pass, setpass] = useState("");
    const navigate = useNavigate(); // Initialize hook

    function handleSubmit(e) {
        e.preventDefault();
        
        const regUser = {
            username: username, // Changed from name to username
            email: email,
            password: pass
        };

        localStorage.setItem('b82', JSON.stringify(regUser));
        toast.success("Registration Successful!");
        
        // Use navigate() function to redirect after a delay so toast shows
        setTimeout(() => {
            navigate('/'); // Redirect to login page
        }, 2000);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="Container m-5 w-50 mx-auto bg-primary p-4 rounded">
                    <h2 className="bg-warning text-center fw-bolder p-3 mb-3">Register Here</h2>
                    <div className="w-75 mx-auto">
                        <div className="form-floating mb-3">
                            <input 
                                type="text" // Changed from password to text
                                value={username} 
                                onChange={(e) => setusername(e.target.value)} 
                                className="form-control" 
                                placeholder="UserName" 
                                required 
                            />
                            <label>UserName</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setemail(e.target.value)} 
                                className="form-control" 
                                placeholder="name@example.com" 
                                required 
                            />
                            <label>Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input 
                                type="password" 
                                value={pass} 
                                onChange={(e) => setpass(e.target.value)} 
                                className="form-control" 
                                placeholder="Password" 
                                required 
                            />
                            <label>Password</label>
                        </div>
                    </div>
                    <div className="w-75 mx-auto mb-3">
                        <button className="btn btn-warning w-100 fw-bold">Submit</button>
                    </div>
                    <p className="text-light text-center">
                        Already have an account? <Link to="/" className="text-warning">Login</Link>
                    </p>
                </div>
            </form>
            <ToastContainer position="top-center" theme="dark" />
        </>
    );
}
