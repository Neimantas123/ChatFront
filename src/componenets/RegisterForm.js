import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Error from './Error';
import { GrClose } from 'react-icons/gr';
import { FaEyeSlash, FaCheck } from 'react-icons/fa';
const webLink = process.env.REACT_APP_BACKEND_LINK;

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isIconClicked, setIsIconClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setEmail(localStorage.getItem('email') || '');
    setPassword(localStorage.getItem('password') || '');
    setRepeatPassword(localStorage.getItem('repeatPassword') || '');
    setFadeIn(true);
  }, []);

  const handleTerms = () => {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('repeatPassword', repeatPassword);

    setIsChecked(!isChecked);
    setIsIconClicked(true);
  };

  const isEmailAlreadyRegistered = async (email) => {
    const { data } = await axios.get(`${webLink}/check-email/${email}`);
    return data.exists;
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === repeatPassword) {
      const emailAlreadyRegistered = await isEmailAlreadyRegistered(email);
      if (emailAlreadyRegistered) {
        setErrorMessage('Email already exists try to login');
        return;
      }
      if (isChecked) {
        try {
          const { data } = await axios.post(`${webLink}/register`, {
            email,
            password,
          });
          localStorage.removeItem('email');
          localStorage.removeItem('password');
          localStorage.removeItem('repeatPassword');
          navigate('/login');
        } catch (err) {
          setErrorMessage(err);
          console.log(err);
        }
      } else {
        setErrorMessage('Please accept terms and conditions');
      }
    } else {
      setErrorMessage('Passwords do not match');
    }
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
      <div className="closeX " onClick={handleClick}>
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
          <form id="loginForm" onSubmit={handleSubmit}>
            <h2 className="lohinh2 desktop">Sign in</h2>
            <h2
              className="lohinh2 mobile"
              style={{
                color: '#000',
                textAlign: 'left',
                marginBottom: '60px',
                marginTop: '60px',
              }}
            >
              Sign in
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
                Repeat Password
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
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
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
            {errorMessage && <Error message={errorMessage} />}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: isIconClicked ? 'auto' : 'pointer',
              }}
            >
              <div
                onClick={!isIconClicked ? handleTerms : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '30px',
                  marginTop: '5px',
                }}
              >
                {!isIconClicked ? (
                  <div className="checker circle">
                    {isChecked && <FaCheck color="#8336ff" size={12} />}
                  </div>
                ) : (
                  <>
                    <span className="mobile">
                      <FaCheck
                        color={isChecked ? '#8336ff' : '#8336ff'}
                        size={20}
                      />
                    </span>
                    <span className="desktop checker">
                      <FaCheck
                        color={isChecked ? '#fff' : '#8336ff'}
                        size={20}
                      />
                    </span>
                  </>
                )}

                <div
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    marginLeft: '5px',
                  }}
                >
                  <Link
                    to="/term"
                    className="policies-link"
                    onClick={handleTerms}
                  >
                    I accept the terms and policies
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="button-block-homescreen forms"
              style={{
                position: 'initial',
                marginTop: '15px',
                marginBottom: '15px',
              }}
            >
              <Button
                name="Submit"
                color="#8336FF"
                text="#fff"
                border="1px solid #B4FF4B"
                font="16px"
                margin="auto"
              />

              <Link
                to="/login"
                style={{
                  color: '#000',
                  fontSize: '14px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  marginTop: '20px',
                }}
              >
                Already have an account? <b>Log in</b>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
