import React from "react";
import { Link, useNavigate } from "react-router-dom";
import getRole from "./getRole";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = token ? getRole() : null; 

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleSiteNameClick = () => {
        if (token) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <div
                    className="text-lg font-semibold cursor-pointer"
                    onClick={handleSiteNameClick}
                >
                    Syntax School
                </div>

                {token && (
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/dashboard" className="hover:underline">
                                Dashboard
                            </Link>
                        </li>
                        {role === "instructor" && (
                            <li>
                                <Link to="courses" className="hover:underline">
                                    Add Course
                                </Link>
                            </li>
                        )}
                        <li>
                            <button onClick={handleLogout} className="hover:underline">
                                Logout
                            </button>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
