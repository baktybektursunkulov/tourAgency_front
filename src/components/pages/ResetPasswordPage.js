import React, { useState, useEffect, axios } from 'react';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';

import '../../App.css'

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = new URLSearchParams(window.location.search).get('token');
    try {
      const response = await fetch('http://localhost:8075/api/password/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });
      console.log(response)
      if (response.ok) {
        console.log('Password reset successfully:', response);
        // const data = await response.json();
        //   localStorage.setItem('myData', JSON.stringify(data));
        history.push('/login');
        // do something with the data
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setError(error.response.data.message);
    }
  }

  return (
    <div className="text-center m-5-auto">
    <h2 className="login_h2">Reset Password</h2>
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <p>
      <label>New password:</label><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </p>
      <p>
      <label>Confirm new password:</label><br />
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
      </p>
      <p>
      <button type="submit">Submit</button>
      </p>
    </form>
    </div>
  );
}
