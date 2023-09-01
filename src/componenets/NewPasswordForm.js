import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import Error from './Error';

const NewPasswordForm = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [fadeIn, setFadeIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const webLink = process.env.REACT_APP_BACKEND_LINK;

  const location = useLocation();
  const [email, setEmail] = useState(location.state.email);

  const handleClick = async (e) => {
    e.preventDefault();
    if (password === newPassword && password.length > 0) {
      const data = { email, newPassword };
      const response = await fetch(`${webLink}/resetpassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        navigate('/success');
      } else {
        setErrorMessage(result.message);
      }
    } else {
      setErrorMessage('passwords do not match');
    }
  };

  const handleClose = () => {
    navigate('/home');
  };
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className="closeX" onClick={handleClose}>
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
          className="forgot-pass"
          src={require('../assets/ugo.png')}
          alt="Ugo"
          style={{ marginBottom: '5vh', marginTop: '50px', width: '130px' }}
        />
        <div className="form-white forgot-pass">
          <form id="loginForm" onSubmit={handleClick}>
            <div
              className="forgot-pass-form-text-block"
              style={{ paddingLeft: '0px' }}
            >
              <h2 className="lohinh2 desktop forgot">Reset password</h2>
              <h2
                className="lohinh2 mobile"
                style={{
                  color: '#000',
                  textAlign: 'left',
                  marginBottom: '13px',
                  marginTop: '100px',
                }}
              >
                Reset password
              </h2>
              <p className="forgot-pass-text">Type new password</p>
            </div>
            <label
              htmlFor="password"
              style={{
                fontSize: '14px',
                marginBottom: '5px',
                alignSelf: 'flex-start',
              }}
            >
              New password
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
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <label
              htmlFor="password"
              style={{
                fontSize: '14px',
                marginBottom: '5px',
                alignSelf: 'flex-start',
              }}
            >
              Confirm new password
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
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                name="Reset password"
                width="80%"
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
                name="Resset password"
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
        </div>
      </div>
    </div>
  );
};

export default NewPasswordForm;
