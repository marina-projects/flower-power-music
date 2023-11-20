// SignUpForm.js
import React, { useContext, useState } from "react";
import './SignUpForm.css';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Изменение импорта
import firebase from '../../firebase/config';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="form-container">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    createUserWithEmailAndPassword(firebase, email, password)
                        .then((userCredential) => {
                            const user = userCredential.user;
                            alert(`Signed up! User ID: ${user.uid}`);
                        })
                        .catch((error) => alert(error.message));
                    setEmail('');
                    setPassword('');
                }}
            >
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => { setEmail(event.target.value) }}
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;
