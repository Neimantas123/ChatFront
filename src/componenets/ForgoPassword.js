import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import Error from './Error';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const webLink = process.env.REACT_APP_BACKEND_LINK;

  const handleClick = (e) => {
    navigate('/login');
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    try {
      const requestUrl = `${webLink}/send-reset-code`;
      const requestBody = JSON.stringify({ email: email });

      console.log('Request URL:', requestUrl);
      console.log('Request Payload:', requestBody);
      const response = await fetch(`${webLink}/send-reset-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });
      const data = await response.json();
      if (data.success) {
        console.log('Reset code sent');
        setEnteredEmail(email);
        console.log('Entered email:', email);
        navigate('/forgot-password-reset', { state: { enteredEmail: email } });
      } else {
        console.log('Error sending reset code');
        setErrorMessage('This email does not exsist');
      }
    } catch (error) {
      console.log('Error:', error);
    }
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
      <div className="login-container forgot-pass">
        <img
          className="forgot-pass"
          src={require('../assets/ugo.png')}
          alt="Ugo"
          style={{ marginBottom: '5vh', marginTop: '10vh', width: '130px' }}
        />
        <div className="form-white forgot-pass">
          <form id="loginForm" onSubmit={handleForgotPassword}>
            <h2 className="lohinh2 desktop"> Forgot password?</h2>
            <h2
              className="lohinh2 mobile"
              style={{
                color: '#000',
                textAlign: 'left',
                marginBottom: '60px',
                marginTop: '100px',
              }}
            >
              Forgot password?
            </h2>
            <p className="forgot-pass-text">
              Don’t worry! It happens. Please enter the email associated with
              your account.
            </p>
            <label
              htmlFor="password"
              style={{
                fontSize: '14px',
                marginBottom: '5px',
                alignSelf: 'flex-start',
              }}
            >
              Email address
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
                name="Send email"
                color="#8336FF"
                text="#fff"
                border="1px solid #B4FF4B"
                font="16px"
                margin="auto"
                type="submit"
              />
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
                name="Send email"
                width="100%"
                color="#8336FF"
                text="#8336FF"
                border="1px solid #B4FF4B"
                font="16px"
                margin="auto"
                type="submit"
              />
            </div>
          </form>
          <div style={{ textAlign: 'center', paddingTop: '100px' }}>
            <Link className="first-forgot-pass-bottom" to="/login">
              Remember password? <b>Log in</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
