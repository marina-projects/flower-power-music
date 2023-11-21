// SignUpForm.js
import React, { useState } from "react";
import './SignUpForm.css';
import { useAuth } from "../../context/AuthContext";
import { WEB_APP } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useNavigate();

    const auth = useAuth();

    return (
        <div className="form-container">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    auth.signup({ email, password, callback: () => history(WEB_APP) })
                    setEmail('');
                    setPassword('');
                }}
            >
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={(event) => { setEmail(event.target.value) }}
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Set a password. Minimum 6 symbols"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
