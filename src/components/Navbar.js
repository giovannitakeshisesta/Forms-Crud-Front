import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid">
            
            <Link  to="/"> Home </Link>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

                <li className="nav-item ms-4">
                <NavLink  to="/mixedFormPage"> MixedForm </NavLink>
                </li>

                <li className="nav-item ms-4">
                <NavLink  to="/imageInputPage"> Image Input </NavLink>
                </li>

                <li className="nav-item ms-4">
                <NavLink  to="/finalform"> All together </NavLink>
                </li>
            </ul>
            </div>
        </div>
    </nav>
    );
}

export default Navbar;
