import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Create App.css file for styling
import logo from './logo.png';

import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUpClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', { name, email, password });
      if (response.data.success) {
        alert("your registration is Successful.");
        document.getElementById('container').classList.remove('right-panel-active');
      } else {
        alert("your registration is unsuccessful. please try again.");
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert("Error signing up. Please try again later.");
    }
  };

  const handleSignInClick = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signin', { email: signInEmail, password: signInPassword });
      if (response.data.success) {
        // alert('Valid user name and password');
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        console.log(response.data.token)
        navigate("/");
      } else {
        alert('Invalid user name or password');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert("Error signing in. Please try again later.");
    }
  };

  return (
    <div className='login'>
      <div className="login-container" id="container">
        <div className="form-container sign-up-container">
          <form className='form'>
            <h1 class="fancy">Create Account</h1>
            <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div>
            <img className='logo' src={logo} alt="Logo" />
            <input className='input' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input className='input' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='input' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='button' type="button" onClick={handleSignUpClick} >Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <img className='logo2' src={logo} alt="Logo" />
          <form className='form'>
            <h1 className="fancy">Sign in</h1>
            <input className='input' type="email" placeholder="Email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} />
            <input className='input' type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} />
            <button className='button' type="button" onClick={handleSignInClick}>Sign In</button>
          </form>
          <img className='logo2' src={logo} alt="Logo" />
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className='sideHeading'>Welcome Back!</h1>
              <button className="ghost" onClick={() => document.getElementById('container').classList.remove('right-panel-active')}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className='sideHeading'>Hello, Friend!</h1>
              <button className="ghost" onClick={() => document.getElementById('container').classList.add('right-panel-active')}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
