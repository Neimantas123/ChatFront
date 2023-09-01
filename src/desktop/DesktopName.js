import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import ButtonDesktop from '../componenets/ButtonDesktop';
const name = localStorage.getItem('userName');

const DesktopHello = (props) => {
  const [fadeIn, setFadeIn] = useState(false);
  const user = localStorage.getItem('userInfo');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const handleClick = () => {
    navigate('/slider');
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className="main-page">
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
        <div className="content-dektop-hello">
          <div className="imageBlockDesktop">
            <img
              className="desktop-stylist-chat"
              src={props.image}
              alt="Alex"
            />
          </div>
          <div className="foto-ugo">
            <h2>Hi {name}</h2>
            <p className="chatp" style={{ padding: '0px 90px' }}>
              I am Ugo and I will be your {props.profession}. Ask me any
              questions about fashion or art.
            </p>
            <Link to={props.chatLink}>
              <ButtonDesktop
                name="Enter"
                width="80%"
                color="#8336FF"
                text="#fff"
                border="1px solid #B4FF4B"
                font="16px"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHello;
