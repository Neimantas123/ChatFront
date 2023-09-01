import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';
import DesktopSlider from '../desktop/DesktopSlider';
import axios from 'axios';
const webLink = process.env.REACT_APP_BACKEND_LINK;

const ContentSlider = (props) => {
  const navigate = useNavigate();
  let userNameStatus;
  const user = localStorage.getItem('userInfo');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showScroll, setShowScroll] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeInSecond, setFadeInSecond] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScroll(true);
      setFadeIn(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: null,
    nextArrow: null,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

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
    setFadeInSecond(true);
    const dataUser = localStorage.getItem('userInfo');
    const emailObject = JSON.parse(dataUser);
    const email = emailObject.email;
    const handelData = async () => {
      try {
        r;
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

  const handleButtonClick1 = () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      navigate(props.stylistHasNoName);
    } else {
      navigate(props.stlystHasNameMobile);
      const letter = userName.charAt(0);
      localStorage.setItem('letter', letter);
    }
  };

  const handleButtonClick2 = () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      navigate(props.artHasNoName);
    } else {
      navigate(props.artHasNameMobile);
      const letter = userName.charAt(0);
      localStorage.setItem('letter', letter);
    }
  };

  const handleButtonClick3 = () => {
    const userName = localStorage.getItem('userName');
    if (!userName) {
      navigate(props.shopperHasNoName);
    } else {
      navigate(props.shopperHasNameMobile);
      const letter = userName.charAt(0);
      localStorage.setItem('letter', letter);
    }
  };

  if (user) {
    return (
      <>
        <div className={`fade-in ${fadeInSecond ? 'active' : ''}`}>
          <div className="main-page slider-mobile-version">
            <div
              className="close-back"
              style={{ position: 'absolute', top: '10px' }}
            >
              <div style={{ display: 'flex' }}>
                <Link to="/home">
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
              </div>

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

            <div className="slider-dekstop">
              <DesktopSlider
                shopperHasNoName={props.shopperHasNoName}
                shopperHasName={props.shopperHasName}
                artHasName={props.artHasName}
                artHasNoName={props.artHasNoName}
                stlystHasName={props.stlystHasName}
                astylistHasNoName={props.stylistHasNoName}
              />
            </div>
            {!showScroll && (
              // <img
              //   className="scroll-image"
              //   src={require('../assets/scroll.png')}
              //   alt="scroll"
              // />

              <div className="slider-first-text">
                <h3>Please select your avatar by scrolling</h3>
              </div>
            )}
            {showScroll && (
              <div className="slider">
                <Slider {...settings}>
                  <div className="slider-slide">
                    <div className="foto-ugo">
                      <img
                        className="alex"
                        src={require('../assets/desktop/Personal-stylis.png')}
                        alt="Alex"
                      />
                      <img
                        src={require('../assets/ugo.png')}
                        alt="Ugo"
                        className="slider-ugo-image"
                      />
                      <p style={{ marginTop: '0px' }}>Profesional stylist</p>

                      <div style={{ position: 'fixed', bottom: '50px' }}>
                        <div>
                          <button
                            onClick={handleButtonClick1}
                            className="slider-mobile-button"
                          >
                            Enter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="slider-slide">
                    <div className="foto-ugo">
                      <img
                        className="alex"
                        src={require('../assets/desktop/Personal-shopper.png')}
                        alt="Alex"
                      />
                      <img src={require('../assets/ugo.png')} alt="Ugo" />
                      <p style={{ marginTop: '0px' }}>Profesional shopper</p>
                      <div style={{ position: 'fixed', bottom: '50px' }}>
                        <div onClick={handleButtonClick3}>
                          <button className="slider-mobile-button">
                            Enter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="slider-slide">
                    <div className="foto-ugo">
                      <img
                        className="alex"
                        src={require('../assets/desktop/Personal-art.png')}
                        alt="Alex"
                      />
                      <img src={require('../assets/ugo.png')} alt="Ugo" />
                      <p style={{ marginTop: '0px' }}>Art advisor</p>
                      <div style={{ position: 'fixed', bottom: '50px' }}>
                        <div onClick={handleButtonClick2}>
                          <button className="slider-mobile-button">
                            Enter
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Slider>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default ContentSlider;
