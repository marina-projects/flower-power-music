import React from 'react';
import { Redirect, Route } from 'react-route-dom';
import { useAuth } from '../../context/AuthContext';
import { LOGIN } from '../../constants/routes';

const PrivateRoute = ({ children, ...rest}) => {
    let auth = useAuth();

    return (
        <Route
            {... rest}
            render={({location}) => 
                auth.user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: LOGIN,
                            state: {from: location}
                        }}
                    />
                )
            }

        />
    )
}

export default PrivateRoute;