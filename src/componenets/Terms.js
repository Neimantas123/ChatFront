import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

const Terms = (props) => {
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
        <div className="closeX terms" onClick={buttonNavigation}>
          <GrClose
            className="back"
            style={{
              color: 'white',
              position: 'initial',
              fontSize: '25px',
            }}
          />
        </div>
        <div className="terms-container">
          <div className="white-terms">
            <div className="terms-header">
              <h2 className="termsH">{props.title}</h2>
              <h5>{props.date}</h5>
            </div>
            <div className="text-container terms">
              <div className="text-content">
                <h3> {props.title1}</h3>
                <p>{props.text1}</p>
                <h3>{props.title2}</h3>
                <p>{props.text2}</p>
                <h3>{props.title3}</h3>
                <p>{props.text3}</p>
                <h3>{props.title4}</h3>
                <p>{props.text4}</p>
                <h3>{props.title5}</h3>
                <p>{props.text5}</p>
                <h3>{props.title6}</h3>
                <p>{props.text6}</p>
                <h3>{props.title7}</h3>
                <p>{props.text7}</p>
                <h3>{props.title8}</h3>
                <p>{props.text8}</p>
                <h3>{props.title9}</h3>
                <p>{props.text9}</p>
                <div style={{ width: '100%', textAlign: 'center' }}>
                  <button
                    style={{ marginTop: '25px' }}
                    onClick={buttonNavigation}
                    className="slider-mobile-button terms"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
