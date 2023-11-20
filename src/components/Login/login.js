import React, { useState } from "react";

const LoginForm = () => {
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    return(
        <div className="form-container">
            <form>
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