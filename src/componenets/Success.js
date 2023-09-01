import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';

const Success = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

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
        <div className="form-white success">
          <img
            className="success-img"
            src={require('../assets/success.png')}
            alt="success"
          />
          <h2 className="lohinh2 desktop success"> Password Changed</h2>
          <h2
            className="lohinh2 mobile success"
            style={{
              color: '#000',
              textAlign: 'left',
              marginBottom: '13px',
              marginTop: '25px',
            }}
          >
            Password Changed
          </h2>
          <p
            className="forgot-pass-text"
            style={{
              paddingLeft: '20px',
              paddingRight: '20px',
              textAlign: 'center',
            }}
          >
            Your password has been changed succesfully
          </p>
          <Link to="/login">
            <button
              style={{ marginTop: '25px' }}
              className="slider-mobile-button"
            >
              Go to login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
