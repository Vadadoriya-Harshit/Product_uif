import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { Link } from 'react-router-dom';
import loginDetails from './logindata.json';
function Login() {
  const [secretData, setSecretData] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,15}$/;
    return re.test(password);
  };
  const fetchLoginData = ()=> {
    const headers = { 'Authorization': 'secret_token' };
    fetch(loginDetails, {headers})
        .then(response => response.json())
        .then(data => console.log(data));
}

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchLoginData();
    setUsernameError('');
    setPasswordError('');
    setUsername('');
    setPassword('');

    if (!username) {
      setUsernameError('Username is required');
    } else if (!validateEmail(username)) {
      setUsernameError('Please enter a valid email address');
    }

    if (!password) {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else if (!validatePassword(password)) {
      setPasswordError('Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be 6 characters long');
    }

    if (!usernameError && !passwordError) {
      console.log('Username:', username);
      console.log('Password:', password);
      
    }
  };

  return (
    <div className='container-fluid'>
      <form className='login-container row d-flex align-items-center' onSubmit={handleSubmit}>
        <div className="col-12 col-md-6 m-auto bg-white rounded shadow p-0">
          <div className="login-info text-center py-4 d-flex justify-content-center align-items-center">
            <h1 className='fw-bold text-light'>
              SIGN IN
            </h1>
          </div>
          <div className="login-fields col-10 m-auto p-4">
            <div className="mb-3 row">
              <label htmlFor="username" className="col-sm-4 col-form-label h4 text-secondary">Username</label>
              <div className="col-sm-8">
                <input type="text" className={`${usernameError ? 'is-invalid' : ''}`} id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                {usernameError && <div className="invalid-feedback">{usernameError}</div>}
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="password" className="col-sm-4 col-form-label h4 text-secondary">Password</label>
              <div className="col-sm-8">
                <input type="password" className={`${passwordError ? 'is-invalid' : ''}`} id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-sm-6 d-flex justify-content-center align-items-center">
                <div className="form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
              </div>
              <div className="col-sm-6 d-flex justify-content-center align-items-center">
                <Link to='/' className='text-danger text-decoration-none'>Forgot Password ?</Link>
              </div>
            </div>
            <div className="text-center pt-4">
              <button type="submit" className='btn btn-primary rounded-pill px-5 py-2'>
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login;
