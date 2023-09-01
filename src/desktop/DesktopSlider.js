import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonDesktop from '../componenets/ButtonDesktop';
import axios from 'axios';
let userNameStatus;
const webLink = process.env.REACT_APP_BACKEND_LINK;

const DesktopSlider = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const dataUser = localStorage.getItem('userInfo');
    const emailObject = JSON.parse(dataUser);
    const email = emailObject.email;
    const handelData = async () => {
      try {
        const response = await axios.post(`${webLink}/find-name`, {
          email,
        });
        const userData = response.data;
        userNameStatus = userData.name;
        console.log(userNameStatus);
        if (userNameStatus) {
          localStorage.setItem('userName', userNameStatus);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handelData();
  }, []);

  const handleButtonClick1 = async () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      navigate(props.stylistHasNoName);
    } else {
      navigate(props.stlystHasName);
      const letter = userName.charAt(0);
      localStorage.setItem('letter', letter);
    }
  };

  const handleButtonClick2 = async () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      navigate(props.artHasNoName);
    } else {
      navigate(props.artHasName);
      const letter = userName.charAt(0);
      localStorage.setItem('letter', letter);
    }
  };

  const handleButtonClick3 = async () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      navigate(props.shopperHasNoName);
    } else {
      navigate(props.shopperHasName);
      const letter = userName.charAt(0);
      localStorage.setItem('letter', letter);
    }
  };

  return (
    <div className="desktop-slider-container">
      <div className="desktop-slider-block">
        <div className="desktop-slider-column">
          <img
            className="desktop-stylist"
            src={require('../assets/desktop/Personal-stylis.png')}
            alt="Alex"
          />
          <img
            className="desktop-ugo"
            src={require('../assets/desktop/DesktopUgo.png')}
            alt="Alex"
          />
          <h4 className="desktop">Personal stylist</h4>
          <div
            onClick={handleButtonClick1}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <ButtonDesktop
              name="Enter"
              width="80%"
              color="#8336FF"
              text="#fff"
              border="1px solid #B4FF4B"
              font="16px"
            />
          </div>
        </div>
        <div className="desktop-slider-column">
          <img
            className="desktop-stylist"
            src={require('../assets/desktop/Personal-shopper.png')}
            alt="Alex"
          />
          <img
            className="desktop-ugo"
            src={require('../assets/desktop/DesktopUgo.png')}
            alt="Alex"
          />
          <h4 className="desktop">Personal shopper</h4>
          <div
            onClick={handleButtonClick3}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <ButtonDesktop
              name="Enter"
              width="80%"
              color="#8336FF"
              text="#fff"
              border="1px solid #B4FF4B"
              font="16px"
            />
          </div>
        </div>
        <div className="desktop-slider-column">
          <img
            className="desktop-stylist"
            src={require('../assets/desktop/Personal-art.png')}
            alt="Alex"
          />
          <img
            className="desktop-ugo"
            src={require('../assets/desktop/DesktopUgo.png')}
            alt="Alex"
          />
          <h4 className="desktop">Art advisor</h4>
          <div
            onClick={handleButtonClick2}
            style={{ width: '100%', textAlign: 'center' }}
          >
            <ButtonDesktop
              name="Enter"
              width="80%"
              color="#8336FF"
              text="#fff"
              border="1px solid #B4FF4B"
              font="16px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSlider;
