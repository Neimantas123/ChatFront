import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';
import { IoIosArrowBack } from 'react-icons/io';
import { GrClose } from 'react-icons/gr';
import { FiDelete } from 'react-icons/fi';
import Error from './Error';
const webLink = process.env.REACT_APP_BACKEND_LINK;

const PasswordResetForm = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);

  const location = useLocation();
  const [email, setEmail] = useState(location.state.enteredEmail);
  console.log('Email in PasswordResetForm:', email);
  //   const handleInputChangeMobile = (event) => {
  //     setInputStyleMobile(event.target.value);
  //   };

  //   const handleInputChangeDesktop = (event) => {
  //     setInputStyleDesktop(event.target.value);
  //   };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  function handleCodeChange(index, value, event) {
    if (!/^\d$/.test(value) && value !== '') {
      return;
    } // Ensure only digits are allowed
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });

    if (value !== '' && index < code.length - 1) {
      event.target.nextElementSibling.focus();
    }
  }

  function handleDelete() {
    setCode((prevCode) => {
      const lastFilledIndex = prevCode.reduceRight((acc, value, index) => {
        if (acc === -1 && value !== '') {
          return index;
        }
        return acc;
      }, -1);
      if (lastFilledIndex >= 0) {
        const newCode = [...prevCode];
        newCode[lastFilledIndex] = '';
        return newCode;
      } else {
        return prevCode;
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codeString = code.join('');
    const codeNumber = parseInt(codeString, 10); // Convert the code string to a number
    console.log('Email in handleSubmit:', email);
    try {
      const response = await fetch(`${webLink}/verify-reset-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, code: codeNumber }), // Send the code as a number
      });

      if (response.status === 400) {
        setErrorMessage('Invalid verification code');

        return;
      }

      const data = await response.json();
      if (data.success) {
        navigate('/new-password-form', { state: { email } });
      } else {
        console.log('Error verifying code');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className="login-container">
        <div
          className="close-back"
          style={{ position: 'absolute', top: '10px' }}
        >
          <div style={{ display: 'flex' }}>
            <Link to="/forgot-password">
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
        <img
          className="forgot-pass"
          src={require('../assets/ugo.png')}
          alt="Ugo"
          style={{ marginBottom: '5vh', marginTop: '50px', width: '130px' }}
        />
        <div className="form-white forgot-pass-enter-value-form">
          <div className="forgot-pass-form-text-block">
            <h2 className="lohinh2 desktop forgot">
              Please check your <br /> email
            </h2>

            <h2
              className="lohinh2 mobile"
              style={{
                color: '#000',
                textAlign: 'left',
                marginBottom: '13px',
                marginTop: '100px',
              }}
            >
              Please check you email
            </h2>
            <p className="forgot-pass-text">We’ve sent a code to {email}</p>
          </div>
          {errorMessage && <Error message={errorMessage} />}
          <form onSubmit={handleSubmit} className="form-forgot-password">
            <div className="code-input">
              {code.map((value, index) => (
                <input
                  key={index}
                  type="text"
                  className="reset-number-input"
                  maxLength={1}
                  value={value}
                  onChange={(event) =>
                    handleCodeChange(index, event.target.value, event)
                  }
                />
              ))}
            </div>
            <div
              className="button-block-homescreen forms mobile"
              style={{
                position: 'initial',
                marginTop: '48px',
                marginBottom: '15px',
              }}
            >
              <Button
                name="Confirm"
                color="#8336FF"
                text="#fff"
                border="1px solid #B4FF4B"
                font="16px"
                margin="auto"
                type="submit"
              />
            </div>
            <div
              className="button-block-homescreen forms desktop-login"
              style={{
                position: 'initial',
                marginTop: '40px',
                marginBottom: '15px',
              }}
            >
              <Button
                name="Send email"
                width="100%"
                color="#8336FF"
                text="#8336FF"
                border="1px solid #B4FF4B"
                font="16px"
                margin="auto"
                type="submit"
              />

              <p className="send-code-timer-form-dekstop">
                Remembered passwod?
                <Link to="/login">
                  <span style={{ fontWeight: 'bold' }}> Login</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="send-code-timer-block">
          <Link
            className="first-forgot-pass-bottom"
            to="/login"
            style={{ color: '#000' }}
          >
            Remember password? <b>Log in</b>
          </Link>
        </div>
        <div className="keyboard">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, '#', 0].map((number) => (
            <button
              key={number}
              className="forgot-pass-single-button"
              onClick={() => {
                const emptyIndex = code.findIndex((value) => value === '');
                if (emptyIndex >= 0) {
                  handleCodeChange(emptyIndex, String(number));
                }
              }}
            >
              {number}
            </button>
          ))}
          <button className="forgot-pass-single-button" onClick={handleDelete}>
            <FiDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
