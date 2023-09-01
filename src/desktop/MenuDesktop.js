import React, { useState } from 'react';
import noAudioIcon from '../assets/icons/NoAudio.png';
import audioIcon from '../assets/icons/Audio.png';
import ButtonDesktop from '../componenets/ButtonDesktop';
import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import { MdOutlineIntegrationInstructions } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const MenuDesktop = (props) => {
  const [activeLink, setActiveLink] = useState('');
  const [isSoundOn, setIsSoundOn] = useState(true);
  const navigate = useNavigate();

  const handleLinkClick = (link) => {
    setActiveLink(link.toLowerCase());
  };

  const navigateClick = () => {
    navigate('/instruction');
  };

  const downloadChat = () => {
    props.onDownloadClick();
  };

  const toggleSound = () => {
    setIsSoundOn((prevValue) => !prevValue);
    props.onSoundClick();
  };

  const handleMenuButtonClickFirst = () => {
    setActiveLink('');
    props.onMenuDelete();
    props.setMenuOpen(false);
    navigate(`${props.link1}`);
  };

  const handleMenuButtonClickSecond = () => {
    setActiveLink('');
    props.onMenuDelete();
    props.setMenuOpen(false);
    navigate(`${props.link2}`);
  };

  const handleClose = () => {
    props.setMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'settings':
        return (
          <div className="manu-setting-section-desktop">
            <div>
              <div className="settings-line" onClick={toggleSound}>
                <img src={isSoundOn ? audioIcon : noAudioIcon} alt="sound" />
                <span>{isSoundOn ? 'Turn off sound' : 'Turn on sound'}</span>
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
          <div className="manu-setting-section-desktop ugo">
            <div>
              <img
                src={require(`../assets/desktop/${props.desktopMenuLink1}`)}
                alt="shooper"
              />
              <p>{props.description}</p>
            </div>
            <ButtonDesktop
              style={{ marginTop: '0px' }}
              name="Enter"
              width="350px"
              color="#8336FF"
              text="#fff"
              border="1px solid #B4FF4B"
              font="16px"
              height="60px"
              marginTop="0px"
              onClick={handleMenuButtonClickFirst}
            />
          </div>
        );
      case `${props.tab2Name.toLowerCase()}`:
        return (
          <div className="manu-setting-section-desktop ugo">
            <div>
              <img
                src={require(`../assets/desktop/${props.desktopMenuLink2}`)}
                alt="shooper"
              />
              <p>{props.description1}</p>
            </div>
            <ButtonDesktop
              style={{ marginTop: '0px' }}
              name="Enter"
              width="350px"
              color="#8336FF"
              text="#fff"
              border="1px solid #B4FF4B"
              font="16px"
              height="60px"
              marginTop="0px"
              onClick={handleMenuButtonClickSecond}
            />
          </div>
        );
      default:
        return (
          <div className="manu-setting-section-desktop">
            <div>
              <div className="settings-line" onClick={toggleSound}>
                <img src={isSoundOn ? audioIcon : noAudioIcon} alt="sound" />
                <span>{isSoundOn ? 'Turn off sound' : 'Turn on sound'}</span>
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
      borderBottom: isActive ? 'none' : 'none',
      borderLeft: isActive ? 'none' : 'none',
      borderRight: isActive ? 'none' : '1px solid #B88BFF',
      borderTop: isActive ? 'none' : 'none',
      backgroundColor: isActive ? '#601BCE' : '',
      fontWeight: isActive ? 600 : 400,
      color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.6)',
    };
  };

  return (
    <div
      className="navigation-desktop desktop"
      style={{
        width: '100%',
      }}
    >
      <div className="closeX" onClick={handleClose} style={{ top: '60px' }}>
        <GrClose
          className="back"
          style={{
            color: 'white',
            position: 'initial',
            fontSize: '25px',
          }}
        />{' '}
      </div>

      <nav>
        <ul className="ulnav desktop">
          <li style={getLinkStyle('settings')}>
            <p onClick={() => handleLinkClick('settings')}>Settings</p>
          </li>
          <li style={getLinkStyle(props.tab1Name)}>
            <p onClick={() => handleLinkClick(props.tab1Name.toLowerCase())}>
              Ugo {props.tab1Name}
            </p>
          </li>
          <li
            className="border-desktop-third"
            style={getLinkStyle(props.tab2Name)}
          >
            <p onClick={() => handleLinkClick(props.tab2Name.toLowerCase())}>
              Ugo {props.tab2Name}
            </p>
          </li>
        </ul>
      </nav>
      <div className="menu-content-desktop">{renderContent()}</div>
    </div>
  );
};

export default MenuDesktop;
