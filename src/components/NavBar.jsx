import React from "react";
import { Link } from 'react-router-dom';

function NavBar() {
return(
    <div className="rounded bg-gray-100 text-gray-700 ">
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/songs">Songs</Link></li>
        </ul>
    </div>
)
}

export default NavBar;