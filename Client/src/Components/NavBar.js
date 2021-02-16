import React from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
    <header className="bg-red-800">
        <div className="container mx-auto flex justify-between">
            <nav className="flex">
                <NavLink
                    to="/"
                    exact
                    activeClassName="text-white"
                    className="inflex-flex items-center py-6 px-3 mr-4 text-yellow-200 hover:text-green-500 text-4xl font-bold cursive tracking-widest"
                    >
                    Welcome to our Asian NGO!
                </NavLink>
                <NavLink 
                    to="/post" 
                    className="inflex-flex items-center py-3 px-3 my-6 rounded text-yellow-200 hover:text-green-500"
                    activeClassName="text-yellow-500 bg-red-900"
                    >
                    Who we are
                </NavLink>
                <NavLink 
                    to="/project" 
                    className="inflex-flex items-center py-3 px-3 my-6 rounded text-yellow-200 hover:text-green-500"
                    activeClassName="text-yellow-500 bg-red-900"
                    >
                    Projects
                </NavLink>
                <NavLink 
                    to="/about" 
                    className="inflex-flex items-center py-3 px-3 my-6 rounded text-yellow-200 hover:text-green-500"
                    activeClassName="text-yellow-500 bg-red-900"
                    >
                    More
                </NavLink>
            </nav>
        </div>
    </header>
    )
}