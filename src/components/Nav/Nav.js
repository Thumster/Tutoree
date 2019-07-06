import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav>
            <ul className="nav-Links">
                <Link to = '/'>
                    <li>Login</li>
                </Link>
                <Link to = 'Home'>
                    <li>Home</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;
