import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaPlane } from "react-icons/fa"; // Import airplane icon from react-icons

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1 flex items-center">
                    {/* Green Airplane Icon */}
                    <div className="mr-2 text-teal-700 text-3xl">
                        <FaPlane />
                    </div>
                    <div className="w-44 h-fit">
                        <a className="btn -mr-20 lg:mr-0 btn-ghost" href="/">
                            <span className="font-extrabold text-teal-700 text-xl">
                                FLYINGZONE
                            </span>
                            <span>all about your journey</span>
                        </a>
                    </div>
                </div>
                <div className="flex-none gap-2">
                    <button
                        onClick={() => navigate('/signin')}
                        className="btn ml-[110px] lg:ml-[950px] bg-teal-700 border-0 text-white btn-success"
                    >
                        Sign in
                    </button>
                </div>
            </div>
            <nav>
                <ul className="flex items-center gap-4">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/chooseflight">Flight</Link>
                    </li>
                    <li>
                        <Link to="/travelerentery">Traveller Entry Details</Link>
                    </li>
                    <li>
                        <Link to="/travelerdetails">Traveller Details</Link>
                    </li>
                    <li>
                        <Link to="/Payment">Payment</Link>
                    </li>
                    <li>
                        <Link to="/account">Create Account</Link>
                    </li>
                    <li>
                        <Link to="/flight">Flights</Link>
                        <Link to="/team">Team Member</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
