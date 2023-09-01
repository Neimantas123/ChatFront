import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from './Button';
import Error from './Error';
import { GrClose } from 'react-icons/gr';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';
const webLink = process.env.REACT_APP_BACKEND_LINK;

const Name = (props) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const user = localStorage.getItem('userInfo');

  const data = localStorage.getItem('userInfo');
  const emailObject = JSON.parse(data);
  const email = emailObject.email;

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  const handleSubmitName = async (e) => {
    e.preventDefault();
    if (!userName) {
      setErrorMessage('Please enter your name');
      return;
    }
    setUserName(userName);
    localStorage.setItem('userName', userName);
    const letter = userName.charAt(0);
    localStorage.setItem('letter', letter);
    try {
      const { data } = await axios.put(`${webLink}/name`, {
        userName,
        email,
      });
    } catch (error) {
      console.log(error);
    }

    navigate(`${props.link}`);
  };
  const handleClick = () => {
    localStorage.clear();
    setFadeIn(false);
    navigate('/home');
  };

  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className="main-page">
        <div className="close-back">
          <Link to="/slider">
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
          <h3 style={{ marginTop: '-5px' }}>{props.profesion}</h3>
        </div>

        <form
          className="form-of-name"
          onSubmit={handleSubmitName}
          style={{ width: '100%' }}
        >
          <input
            className="form-input desktopform form-for-name"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
          />
          {errorMessage && <Error message={errorMessage} />}

          <div className="button-block-homescreen forms desktop">
            <Button
              width="42s%"
              color="#8336FF"
              text="#fff"
              border="1px solid #B4FF4B"
              name="Continue"
              margin="auto"
              marginTop="60px"
            />
          </div>
          <div className="button-block-homescreen forms mobile">
            <Button
              width="330px"
              color="#8336FF"
              text="#fff"
              border="1px solid #B4FF4B"
              name="Continue"
              margin="auto"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Name;
