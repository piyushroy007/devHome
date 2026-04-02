import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

const Login = () => {
    const [email, setEmail] = useState("piyush@gmail.com");
    const [password, setPassword] = useState("Piyush@123");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }
        console.log(email, password);
        const response = await axios.post("http://localhost:5000/login", {
            email,
            password,
        });
        console.log(response.data);
    };

    return (
        <div className="bg-base-200 flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center mb-6">
                        Login to Your Account
                    </h2>

                    {/* Email Input */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="form-control mt-4">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full"
                        />
                        <label className="label">
                            <a
                                href="#"
                                className="label-text-alt link link-hover">
                                Forgot password?
                            </a>
                        </label>
                    </div>

                    {/* Login Button */}
                    <div className="form-control mt-6">
                        <button
                            onClick={handleSubmit}
                            className="btn btn-primary">
                            Login
                        </button>
                    </div>

                    {/* Signup Link */}
                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Don't have an account?{" "}
                            <a href="/signup" className="link link-primary">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
