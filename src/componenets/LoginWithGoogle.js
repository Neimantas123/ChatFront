import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const CLIENT_ID =
  '381111876362-7922edsff6m3789acipclpcd9i138a3q.apps.googleusercontent.com';
const webLink = process.env.REACT_APP_BACKEND_LINK;
const GoogleLoginButton = () => {
  const buttonRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadGoogleScript = (callback) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.async = true;
      script.defer = true;
      script.onload = () => callback();
      document.body.appendChild(script);
    };

    if (!window.google) {
      loadGoogleScript(initGoogleButton);
    } else {
      initGoogleButton();
    }
  }, []);

  const initGoogleButton = () => {
    window.google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleLogin,
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: 'outline',
      size: 'medium',
      type: 'standart',
    });
  };

  const handleLogin = async (response) => {
    if (response.credential) {
      console.log('Google Login Success:', response);

      // Decode the ID token
      const decodedToken = jwt_decode(response.credential);

      // Get the user's email
      const email = decodedToken.email;
      try {
        const { data } = await axios.post(`${webLink}/google-login`, {
          email,
        });
        const userData = JSON.stringify(data);
        window.localStorage.setItem('userInfo', userData);

        navigate('/slider');
      } catch (err) {
        setErrorMessage('Invalid email or password');
      }
    }
  };

  return <div className="google-div" ref={buttonRef} />;
};

export default GoogleLoginButton;
