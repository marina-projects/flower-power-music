import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LOGIN } from '../routes';

const PrivateRoute = ({ children, ...rest}) => {
    let auth = useAuth();

    return (
                    auth.user ? (
                        children
                    ) : (
                        <Navigate
                            to={{
                                pathname: LOGIN,
                                // state: {from: location}
                            }}
                        />
                    )
    )
}

export default PrivateRoute;