import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GrClose, GrTextAlignCenter } from 'react-icons/gr';
import Button from './Button';

const CardPassReset = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const buttonNavigation = () => {
    navigate(-1);
  };
  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className="term-page">
        <GrClose
          onClick={buttonNavigation}
          className="terms-back"
          style={{
            color: 'white',
            position: 'initial',
            fontSize: '25px',
            position: 'absolute',
            right: '15px',
            top: '15px',
            cursor: 'pointer',
          }}
        />
        <div className="forgot-password-container-email">
          <div className="forgot-password-container-email-card">
            <h2 className="termsH">Forgot Password</h2>
            <div className="text-content">
              <p>
                Uh-oh! It seems like you've forgotten your password. Don't
                worry, we've got your back. Please send an email to
                <b> shops@madistamundus.com</b> and provide your username.
              </p>
              <p>
                Thank you for choosing our service, and we apologize for any
                inconvenience caused. If you have any additional questions or
                need further assistance, please don't hesitate to contact our
                support team.
              </p>
              <div
                className="forgot-pass-button-block"
                style={{ textAlign: 'center', marginTop: '25px' }}
              >
                <Button
                  name="Log in"
                  width="50%"
                  color="#8336FF"
                  text="#fff"
                  border="1px solid #B4FF4B"
                  font="16px"
                  onClick={buttonNavigation}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPassReset;
