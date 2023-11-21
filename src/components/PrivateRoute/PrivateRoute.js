import React from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LOGIN } from '../../constants/routes';

const PrivateRoute = ({ children, ...rest}) => {
    let auth = useAuth();

    return (
        // <div>
        //     <Routes>
        //         <Route
        //         {... rest}
        //         render={({location}) => 
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
        //         }
        //         />
        //     </Routes>
        // </div>
        
    )
}

export default PrivateRoute;