import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { WEB_APP } from "../../constants/routes";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    let history = useNavigate();

    const auth = useAuth();

    return(
        <div className="form-container">
            <form onSubmit={(event) => {
                event.preventDefault();
                auth.signin({
                    email: emailValue,
                    password: passwordValue,
                    callback: () => history(WEB_APP),
                })
            }}>
            <label>What is your email</label>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={emailValue}
                    onChange={(event) => { setEmailValue(event.target.value) }}
                />
                <label>What is your password</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={passwordValue}
                    onChange={(event) => { setPasswordValue(event.target.value) }}
                />
                <button type="submit">Log in</button>

            </form>
        </div>
    )
}

export default LoginForm;