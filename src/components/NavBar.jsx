import React from "react";
import { Link } from 'react-router-dom';

function NavBar() {
return(
    <nav className="bg-gray-300 text-gray-700 p-4 shadow-md rounded mb-6">
        <ul>
        <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
        <li><Link to="/songs" className="hover:text-blue-600 transition-colors">Songs</Link></li>
        </ul>
    </nav>
)
}

export default NavBar;