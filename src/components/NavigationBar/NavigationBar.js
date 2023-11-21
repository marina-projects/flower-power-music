import React from "react";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import './NavigationBar.css'


const NavigationBar = () => {
    return (
        <div className="navigation-bar">
            <nav>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                    </li>
                    <li>
                        <Link to='/signup'>Sign Up</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavigationBar;