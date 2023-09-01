import React, { useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import noAudioIcon from '../assets/icons/NoAudio.png';
import audioIcon from '../assets/icons/Audio.png';
import { MdOutlineIntegrationInstructions } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const Menu = (props) => {
  const [activeLink, setActiveLink] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setActiveLink(link.toLowerCase());
  };

  const toggleSound = () => {
    setIsSoundOn((prevValue) => !prevValue);
    props.onSoundClick();
  };

  const handleMenuButtonClickFirst = () => {
    setActiveLink('');
    props.setMenuOpen(false);
    navigate(`${props.link1}`);
    props.onMenuButtonClick();
  };

  const handleMenuButtonClickSecond = () => {
    setActiveLink('');
    props.setMenuOpen(false);
    navigate(`${props.link2}`);
    props.onMenuButtonClick();
  };

  const handleClick = () => {
    props.setMenuOpen(false);
  };

  const downloadChat = () => {
    props.onDownloadClick();
  };

  const navigateClick = () => {
    navigate('/instruction');
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'settings':
        return (
          <div className="manu-setting-section">
            <div>
              <div className="settings-line" onClick={toggleSound}>
                <img src={isSoundOn ? audioIcon : noAudioIcon} alt="sound" />
                <span>{isSoundOn ? 'Turn on sound ' : 'Turn off sound'}</span>
              </div>
              <div className="settings-line" onClick={downloadChat}>
                <img
                  src={require('../assets/icons/Clouddownload.png')}
                  alt="cloud"
                />
                <span>Download transcript</span>
              </div>
              <div className="settings-line" onClick={navigateClick}>
                <MdOutlineIntegrationInstructions size={31} />
                <span>Information</span>
              </div>
              <div className="settings-line">
                <a
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  href="https://shop.futugoapp.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineShoppingCart size={31} />
                  <span>Go shopping</span>
                </a>
              </div>
            </div>
          </div>
        );
      case `${props.tab1Name.toLowerCase()}`:
        return (
          <div
            className="tabs-menu-background"
            style={{
              backgroundImage: `url(${require(`../assets/${props.background}`)})`,
            }}
          >
            <div className="menu-content-section">
              <p>{props.description}</p>
            </div>
            <Button
              type="submit"
              width="80%"
              color="#8336FF"
              text="#fff"
              name="Next"
              marginL="10%"
              border="1px solid #B4FF4B"
              position="absolute"
              bottom="60px"
              onClick={handleMenuButtonClickFirst}
            />
          </div>
        );
      case `${props.tab2Name.toLowerCase()}`:
        return (
          <div
            className="tabs-menu-background"
            style={{
              backgroundImage: `url(${require(`../assets/${props.background1}`)})`,
            }}
          >
            <div className="menu-content-section">
              <p>{props.description1}</p>
            </div>
            <Button
              type="submit"
              width="80%"
              color="#8336FF"
              text="#fff"
              name="Next"
              marginL="10%"
              border="1px solid #B4FF4B"
              position="absolute"
              bottom="60px"
              onClick={handleMenuButtonClickSecond}
            />
          </div>
        );
      default:
        return (
          <div className="manu-setting-section">
            <div>
              <div className="settings-line" onClick={toggleSound}>
                <img src={isSoundOn ? audioIcon : noAudioIcon} alt="sound" />
                <span>{isSoundOn ? 'Turn on sound' : 'Turn off sound'}</span>
              </div>
              <div className="settings-line" onClick={downloadChat}>
                <img
                  src={require('../assets/icons/Clouddownload.png')}
                  alt="cloud"
                />
                <span>Download transcript</span>
              </div>
              <div className="settings-line" onClick={navigateClick}>
                <MdOutlineIntegrationInstructions size={31} />
                <span>Information</span>
              </div>
              <div className="settings-line">
                <a
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  href="https://shop.futugoapp.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <AiOutlineShoppingCart size={31} />
                  <span>Go shopping</span>
                </a>
              </div>
            </div>
          </div>
        );
    }
  };

  const getLinkStyle = (link) => {
    const isActive = activeLink === link.toLowerCase();
    return {
      borderBottom: isActive ? 'none' : '2px solid #B4FF4B',
      borderLeft: isActive ? '2px solid #B4FF4B' : 'none',
      borderRight: isActive ? '2px solid #B4FF4B' : 'none',
      borderTop: isActive ? '2px solid #B4FF4B' : 'none',
      backgroundColor: isActive ? '' : '#B88BFF',
      fontWeight: isActive ? 600 : 400,
      color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
    };
  };

  return (
    <>
      <div className="menu-header">
        <div className="close-back">
          <div className="closeX" onClick={handleClick}>
            <img
              src={require('../assets/close-green.png')}
              className="back"
              style={{
                position: 'initial',
                fontSize: '25px',
              }}
              alt="close"
            />
          </div>
        </div>
      </div>
      <nav>
        <ul className="ulnav">
          <li style={getLinkStyle('settings')}>
            <p onClick={() => handleLinkClick('settings')}>Settings</p>
          </li>
          <li style={getLinkStyle(props.tab1Name)}>
            <p onClick={() => handleLinkClick(props.tab1Name.toLowerCase())}>
              {props.tab1Name}
            </p>
          </li>
          <li style={getLinkStyle(props.tab2Name)}>
            <p onClick={() => handleLinkClick(props.tab2Name.toLowerCase())}>
              {props.tab2Name}
            </p>
          </li>
        </ul>
      </nav>
      <div className="menu-content">{renderContent()}</div>
    </>
  );
};

export default Menu;
