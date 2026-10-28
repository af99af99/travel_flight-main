import React, { useState } from "react";
import { FaKey, FaEnvelope } from "react-icons/fa";
import planeim from "src/assets/logback.jpg";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import api from "src/services/api";

const Signin = () => {
      const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reminder, setReminder] = useState('');
    
      const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
          const response = await api.post('/member/login', { email, password });
      
          // Save the token in localStorage or your preferred method
          localStorage.setItem('token', response.data.token);
      
          // Redirect to the React admin dashboard
          window.location.href = response.data.redirect_url;      
        } catch (error) {
          console.error('Login failed', error);
        }
      };
    
    return (
        <div>
            <div className="header-root">
                <Navbar />
            </div>

            <div className="px-0 sm:px-2 lg:px-[130px] w-full h-screen flex items-center justify-center bg-teal-700">
                <div
                    className="w-full h-[100vh] sm:h-[90vh] xs:h-[100vh] lg:h-[90vh] mb-8 rounded-xl shadow-xl flex items-center justify-center"
                    style={{
                        backgroundImage: `url(${planeim})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className="card glass w-[550px] h-fit flex flex-col p-8 rounded-xl shadow-xl space-y-6 bg-opacity-80">
                        {/* Email Address */}
                        <div className="flex flex-col text-left">
                            <label className="mb-2 font-medium">
                                Email Address
                            </label>
                            <div className="input input-bordered flex items-center gap-2 p-2 rounded-lg border border-gray-300">
                                <FaEnvelope />
                                <input
                                    type="text"
                                    className="grow bg-transparent outline-none"
                                    placeholder="Email"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col text-left">
                            <label className="mb-2 font-medium">Password</label>
                            <div className="input input-bordered flex items-center gap-2 p-2 rounded-lg border border-gray-300">
                                <FaKey />
                                <input
                                    type="password"
                                    className="grow bg-transparent outline-none"
                                    placeholder="Password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex label-text items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2 checkbox checkbox-primary text-red-600 h-5 w-5"
                                />
                                Remember me
                            </label>
                            <a
                                href="#"
                                className="text-red-600 text-sm font-medium"
                            >
                                Forgot Password?
                            </a>
                        </div>
                        <button className="w-full bg-teal-700 text-white font-medium py-2 rounded-lg hover:bg-teal-500"
                            onClick={handleLogin}
                        >
                            Sign in
                        </button>
                    {/* Create Account Link */}
                    <p className="text-center text-white text-sm mt-4">
                        Don't have a Flight Expert Account yet?
                        <Link to={"/account"} className="text-red-600 font-medium ml-1">
                            Create an Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Signin;
