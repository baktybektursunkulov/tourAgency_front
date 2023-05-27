import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import '../../App.css'

export default function SignUpPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
            value
        ); // Password must contain at least 8 characters, including at least one letter and one number.
        setIsValid(isValidPassword);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8075/api/v1/auth/logup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, firstName, lastName, email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage("An error occurred. Username or email excited.");
            } else {
                // Redirect the user to the login page upon successful signup
                window.location.href = '/login';
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleSubmit}>
                {errorMessage && <div>{errorMessage}</div>}
                <p>
                    <label>Username</label><br />
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                </p>
                <p>
                    <label>Email address</label><br />
                    <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </p>
                <p>
                    <label>First name</label><br />
                    <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                </p>
                <p>
                    <label>Last name</label><br />
                    <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                </p>
                <p>
                    <label>Password</label><br />
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                    {isValid ? (
                        <p className="validPassword">Password is valid.</p>
                    ) : (
                        <p className="invalidPassword">Password must contain at least 8 characters, including at least one letter and one number.</p>
                    )}
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )

}
