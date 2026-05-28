import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        const storedData = localStorage.getItem('b82');

        if (!storedData) {
            alert("No user found. Please register.");
            return;
        }

        const regUser = JSON.parse(storedData);

      
        if (regUser.username === username && regUser.password === password) {
            alert("Login Successful!");
        } else {
            alert("Invalid Credentials!");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className="Container  w-50 mx-auto bg-primary text-white pb-3 rounded">
                <h2 className="bg-warning text-dark text-center fw-bolder p-3 m-0">Login Here</h2>

                <div className="w-75 m-5  w-50 mx-auto">
                    <div className="form-floating mb-4">
                        <input
                            type="text"
                            className="form-control text-dark"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label className="text-dark">UserName</label>
                    </div>

                    <div className="form-floating mb-4">
                        <input
                            type="password"
                            className="form-control text-dark"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <label className="text-dark">Password</label>
                    </div>
                </div>

                <div className="w-75 mx-auto">
                    <button type="submit" className="btn btn-warning w-100 mb-3 fw-bold">Login</button>
                </div>

                <p className="text-center mt-3">
                    Don't have an account? <Link to='/Register' className="text-warning fw-bold">Register</Link>
                </p>
            </div>
        </form>
    );
}
