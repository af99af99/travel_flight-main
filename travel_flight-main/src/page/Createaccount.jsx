import React from "react";
import { FaKey, FaEnvelope, FaUser } from "react-icons/fa"; // Import FaUser icon
import bg from "src/assets/a_modern.jpg";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
const Createaccount = () => {
    return (
        <div>
            <div className="header-root">
                <Navbar />
            </div>
        <div className="px-0 sm:px-2 lg:px-[130px] w-full h-screen flex items-center justify-center bg-teal-700">
            <div
                className="w-full h-[100vh] sm:h-[90vh] xs:h-[100vh] lg:h-[90vh] mb-8 rounded-xl shadow-xl flex items-center justify-center"
                style={{
                    backgroundImage: `url(${bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
               <div className="card glass w-[550px] h-fit flex flex-col p-8 rounded-xl shadow-xl space-y-6 bg-opacity-50 backdrop-blur-sm">
                        <div className="font-bold text-center text-[30px]">Create Account</div>
                   {/* Name Field */}
                   <div className="flex flex-col text-left">
                        <label className="mb-2 font-bold">Name</label>
                        <div className="input input-bordered flex items-center gap-2 p-2 rounded-lg border border-gray-300">
                            <FaUser /> {/* Person icon */}
                            <input
                                type="text"
                                className="grow bg-transparent outline-none"
                                placeholder="Name"
                            />
                        </div>
                    </div>
   
                    {/* Email Address */}
                    <div className="flex flex-col text-left">
                        <label className="mb-2 font-bold">Email Address</label>
                        <div className="input input-bordered flex items-center gap-2 p-2 rounded-lg border border-gray-300">
                            <FaEnvelope />
                            <input
                                type="text"
                                className="grow bg-transparent outline-none"
                                placeholder="Email"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col text-left">
                        <label className="mb-2 font-bold">Password</label>
                        <div className="input input-bordered flex items-center gap-2 p-2 rounded-lg border border-gray-300">
                            <FaKey />
                            <input
                                type="password"
                                className="grow bg-transparent outline-none"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {/* Sign Up and Sign In Buttons */}
                    
                        <button className="w-full bg-teal-700 text-white font-medium py-2 rounded-lg hover:bg-teal-500">
                            Sign up
                        </button>
                        
                  

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-gray-300"></div>
                        {/* <span className="mx-2 text-white">or Sign in with</span> */}
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                     {/* Create Account Link */}
                     <p className="text-center text-black text-sm mt-4">
                        If You Already Have An Account?
                        <Link to={"/signin"} className="text-red-600 font-medium ml-1">
                            Sign In
                        </Link>
                    </p>
                    
                </div>
            </div>
        </div>
        </div>
    );
};

export default Createaccount;
