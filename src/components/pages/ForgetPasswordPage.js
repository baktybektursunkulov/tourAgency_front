import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

import '../../App.css'

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8075/api/password/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      console.log(response.ok)
      if (response.ok) {
          history.push('/login');
        // do something with the data
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div className="text-center m-5-auto">
            <h2>Reset your password</h2>
            <h5>Enter your email address and we will send you a new password</h5>
            <form onSubmit={handleSubmit} action="/login">
                <p>
                    <label id="reset_pass_lbl">Email address</label><br />
                    <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Send password reset email</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
