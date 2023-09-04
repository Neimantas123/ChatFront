import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import videoUrl from '../assets/landingVideo.mp4';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <h2>Welcome to</h2>
        <img src={require('../assets/ugo.png')} alt="Ugo" />
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-screen main firstpage">
      {/* <video
        className="desktop"
        autoPlay
        loop
        muted
        style={{
          width: '100%',
          maxWidth: '900px', // Or whatever fixed width you want
          zIndex: '1',
          marginTop: '20px',
        }}
        src={videoUrl}
      /> */}
      {/* <p className="home-welcome-to">Welcome to</p> */}
      <div className="foto-ugo homescreen desktop">
        <img
          style={{ marginTop: '24px' }}
          src={require('../assets/ugo.png')}
          alt="Ugo"
        />
      </div>

      <div className="foto-ugo mobile">
        {/* <p className="home-welcome-to">Welcome to</p> */}
        <img
          style={{ marginTop: '24px' }}
          src={require('../assets/ugo.png')}
          alt="Ugo"
        />
      </div>

      <div
        className="button-block-homescreen mobile loginpage"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Link to="/login" style={{ width: '100%' }}>
          <Button
            width="350px"
            color="#B4FF4B"
            name="Log in"
            text="#8336FF"
            border="1px solid #B4FF4B"
          />
        </Link>
        <Link to="/register" style={{ width: '100%' }}>
          <Button
            id="sdsd"
            width="350px"
            color="#e0fcac"
            text="#8336FF"
            border="1px solid #B4FF4B"
            name="Register"
          />
        </Link>
      </div>
    </div>
  );
};

export default HomeScreen;
