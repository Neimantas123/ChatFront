import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { GrClose } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';
const name = localStorage.getItem('userName');

const Hello = (props) => {
  const [fadeIn, setFadeIn] = useState(false);
  const user = localStorage.getItem('userInfo');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const handleClick = () => {
    localStorage.clear();
    navigate('/home');
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className="main-page">
        <div className="close-back">
          <Link to="/slider        ">
            <div
              className="back"
              style={{
                position: 'initial',
                marginTop: '13px',
                marginLeft: '11px',
              }}
            >
              <IoIosArrowBack style={{ color: 'white' }} />
            </div>
          </Link>
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
        </div>
        <div className="foto-ugo smaller">
          <img className="alex" src={props.avatar} alt="Alex" />
          <h3>Chat with</h3>
          <img
            className="foto-ugo-other"
            src={require('../assets/ugo.png')}
            alt="Ugo"
          />
          <h3 className="hello-profesion">{props.profesion}</h3>
        </div>
        <div className="hello-text desktop">
          <h2>Hi {name}!</h2>
          <p className="chatp" style={{ margin: 'auto', marginTop: '15px' }}>
            I am Ugo and I will be your {props.profesion}. Ask me any kind of
            question about {props.text}.
          </p>
        </div>

        <div className="hello-text mobile">
          <h2>Hi {name}!</h2>
          <p className="chatp" style={{ padding: '0px 90px' }}>
            I am Ugo and I will be your {props.profesion}.
          </p>
        </div>

        <div className="button-block-homescreen name forms mobile">
          <Button
            type="submit"
            width="350px"
            color="#8336FF"
            text="#fff"
            name="Next"
            margin="auto"
            border="1px solid #B4FF4B"
            onClick={() => navigate(`${props.link}`)}
          />
        </div>
        <div className="button-block-homescreen name forms desktop">
          <Button
            type="submit"
            width="350px"
            color="#8336FF"
            text="#fff"
            name="Next"
            margin="auto"
            marginTop="30px"
            border="1px solid #B4FF4B"
            onClick={() => navigate(`${props.link}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Hello;
