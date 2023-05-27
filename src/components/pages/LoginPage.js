import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

import '../../App.css'

// export const [adminToken, setAdminToken] = useState('');

export default function SignInPage() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8075/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        const sessionData = { isLoggedIn: true };
          const expirationTime = new Date().getTime() + 3600000; // Время жизни 1 час
          localStorage.setItem('sessionData', JSON.stringify({
            data: sessionData,
            expiration: expirationTime
          }));
        if (username === 'ADMIN') {
          localStorage.setItem('myData', JSON.stringify(data));
          history.push('/admin');
        }
        else history.push('/home');
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
      <h2 className="login_h2">Sign in to us</h2>
      <form onSubmit={handleSubmit} action="/home">
        <p>
          <label>Username</label><br />
          <input type="text" id="username" value={username} onChange={(event) => setUsername(event.target.value)} />
        </p>
        <p>
          <label>Password</label>
          <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
          <br />
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </p>
        <p>
          <button id="sub_btn" type="submit">Login</button>
        </p>
      </form>
      <footer>
        <p>First time? <Link to="/register">Create an account</Link>.</p>
        <p><Link to="/">Back to Homepage</Link>.</p>
      </footer>
    </div>
  )
}
