import React from "react";
import { Link } from 'react-router-dom';
import * as ROUTES from '../routes';
import './NavigationBar.css'
import { useAuth } from "../context/AuthContext";


const NavigationBar = () => {

    const auth = useAuth(); 

    return (
        <div className="navigation-bar">
            <nav>
                <ul>
                    <li>
                        <Link to='/' className="link">Home</Link>
                    </li>
                    {auth.user ? <>
                        <Link to='/webapp' className="link">Open Web App</Link>
                        <li onClick={() => auth.signout()}>
                            <Link to='/' className="link">Sign Out</Link>
                            </li>
                    </> : <>
                        <li>
                            <Link to='/signup' className="link">Sign Up</Link>
                        </li>
                        <li>
                            <Link to='/login' className="link">Login</Link>
                        </li>
                    </>}
                    
                </ul>
            </nav>
        </div>
    )
}

export default NavigationBar;