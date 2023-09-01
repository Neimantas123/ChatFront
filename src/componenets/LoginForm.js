import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Error from './Error';
import { GrClose } from 'react-icons/gr';
import { FaEyeSlash } from 'react-icons/fa';
import GoogleLoginButton from './LoginWithGoogle';

// const CLIENT_ID =
//   '381111876362-7922edsff6m3789acipclpcd9i138a3q.apps.googleusercontent.com';
const webLink = process.env.REACT_APP_BACKEND_LINK;

// const authUrl = `${webLink}/auth/google`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${webLink}/login`, {
        email,
        password,
      });

      console.log('Token:', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));
      if (data.token) {
        navigate('/slider', { state: { enteredEmail: email } });
      } else {
        setErrorMessage('Invlaid token. Try to login again');
      }
    } catch (err) {
      setErrorMessage('Invalid email or password');
      console.log(`login error ${err}`);
    }
  };

  // const handleSubmitDesktop = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post(`${webLink}/login`, {
  //       email,
  //       password,
  //     });
  //     localStorage.setItem('userInfo', JSON.stringify(data));
  //     navigate('/slider');
  //   } catch (err) {
  //     setErrorMessage('Invalid email or password');
  //   }
  // };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = () => {
    localStorage.clear();
    navigate('/home');
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className="closeX" onClick={handleClick}>
        <GrClose
          className="back"
          style={{
            color: 'white',
            position: 'initial',
            fontSize: '25px',
          }}
        />
      </div>
      <div className="login-container">
        <img
          className="foto-ugo-other"
          src={require('../assets/ugo.png')}
          alt="Ugo"
          style={{ marginBottom: '50px', marginTop: '50px', width: '130px' }}
        />
        <div className="form-white">
          <form id="loginForm">
            <h2 className="lohinh2 desktop">Log in</h2>
            <h2
              className="lohinh2 mobile"
              style={{
                color: '#000',
                textAlign: 'left',
                marginBottom: '60px',
                marginTop: '60px',
              }}
            >
              Log in
            </h2>
            <label
              htmlFor="password"
              style={{
                fontSize: '14px',
                marginBottom: '5px',
                alignSelf: 'flex-start',
              }}
            >
              Email
            </label>
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: '10px',
              }}
            >
              <label
                htmlFor="password"
                style={{
                  fontSize: '14px',
                  marginBottom: '5px',
                  alignSelf: 'flex-start',
                }}
              >
                Password
              </label>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <input
                  className="form-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                />

                <span
                  className={`show-password-icon ${
                    !showPassword ? 'hidden-input-icon' : ''
                  }`}
                  onClick={handleTogglePassword}
                >
                  <FaEyeSlash />
                </span>
              </div>
            </div>
            <Link className="link-forgot-pass" to="/forgot-password">
              <p className="forgot-pass">Forgot password?</p>
            </Link>
            {errorMessage && <Error message={errorMessage} />}
            <div
              className="button-block-homescreen forms mobile"
              style={{
                position: 'initial',
                marginTop: '15px',
                marginBottom: '15px',
              }}
            >
              <Button
                name="Log in"
                color="#8336FF"
                text="#fff"
                border="1px solid #B4FF4B"
                font="16px"
                margin="auto"
                onClick={handleSubmit}
              />
              <Link
                to="/register"
                style={{
                  color: '#000',
                  fontSize: '14px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  marginTop: '15px',
                }}
              >
                Register now
              </Link>
            </div>

            <div
              className="button-block-homescreen forms desktop-login"
              style={{
                position: 'initial',
                marginTop: '15px',
                marginBottom: '15px',
              }}
            >
              <Button
                name="Log in"
                width="100%"
                color="#8336FF"
                text="#fff"
                border="1px solid #B4FF4B"
                font="16px"
                margin="auto"
                onClick={handleSubmit}
              />
              <Link
                to="/register"
                style={{
                  color: '#000',
                  fontSize: '14px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  marginTop: '15px',
                }}
              >
                Register now
              </Link>
            </div>
            <div className="line"></div>

            <GoogleLoginButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
