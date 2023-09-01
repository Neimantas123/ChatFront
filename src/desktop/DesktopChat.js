import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import MenuDesktop from './MenuDesktop';
import alertSound from '../assets/public/alertsound.mp3';
import Linkify from 'react-linkify';
const notificationSound = new Audio(alertSound);
const webLink = process.env.REACT_APP_BACKEND_LINK;

const DesktopChat = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fullChat, setFullChat] = useState([]);
  const [allChat, setAllChat] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  // const [firstMessage, setFirstMessage] = useState();
  const [chatOn, setChatOn] = useState(true);
  const user = localStorage.getItem('userInfo');
  const letter = localStorage.getItem('letter');
  const [menuOpen, setMenuOpen] = useState();
  const [conversationHistory, setConversationHistory] = useState([]);
  const chatBlockRef = useRef(null);

  useEffect(() => {
    if (chatBlockRef.current) {
      chatBlockRef.current.scrollTop = chatBlockRef.current.scrollHeight;
    }
  }, [chats]);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    setAllChat([chats]);
  }, [chats]);

  const handleSoundOn = () => {
    setChatOn(!chatOn);
  };

  const handleMenuButtonClick = () => {
    props.handleMenuButtonClick();
  };

  const handelChatDelete = () => {
    setChats([]);
    setConversationHistory([]);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(allChat)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'allChat.txt';
    document.body.appendChild(element);
    element.click();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const fetchConversationHistory = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = userInfo && userInfo.token;

        const res = await fetch(`${webLink}/${props.link}`, {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
            Authorization: token,
          },
        });
        const data = await res.json();
        setConversationHistory(data.conversationHistory);
        console.log(conversationHistory);
      } catch (err) {
        console.log(err);
      }
    };
    fetchConversationHistory();
  }, [props.link]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newChat = {
      question: message,
      answer: '',
    };
    setChats([...chats, newChat]);
    setFullChat([...fullChat, newChat]);

    setMessage('');
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo && userInfo.token;

      const res = await fetch(`${webLink}/${props.link}`, {
        method: 'Post',
        headers: {
          'Content-type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({ message, fullChat }),
      });
      const data = await res.json();
      newChat.answer = data.message;
      setChats([...chats, newChat]);
      console.log(conversationHistory);
      if (chatOn) {
        notificationSound.play();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  // if (!firstMessage) {
  //   return (
  //     <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
  //       <div className="main-page" style={{ justifyContent: 'center' }}>
  //         <div className="first desktop">
  //           <Link to="/slider">
  //             <div className="closeX">
  //               <GrClose
  //                 className="back"
  //                 style={{
  //                   color: 'white',
  //                   position: 'initial',
  //                   fontSize: '25px',
  //                 }}
  //               />
  //             </div>
  //           </Link>
  //           <div className="first-img-text desktop">
  //             <img className="ugo-question-logo" src={props.image} alt="Ugo" />
  //             <h3>Chat with</h3>
  //             <img
  //               className="foto-ugo-other"
  //               src={require('../assets/ugo.png')}
  //               alt="Ugo"
  //               style={{ width: '151px', height: '67px' }}
  //             />
  //             <h3 style={{ marginTop: '5px' }}>{props.profesion}</h3>
  //             <form
  //               className="desktop-chat-first-question"
  //               onSubmit={handleSubmitFirst}
  //             >
  //               <textarea
  //                 autoFocus
  //                 type="text"
  //                 placeholder={props.placeholder}
  //                 value={message}
  //                 onChange={(e) => setMessage(e.target.value)}
  //                 className=""
  //               />

  //               <button
  //                 type="submit"
  //                 className="first-desktop-question-button"
  //                 disabled={loading || message.trim() === ''}
  //               >
  //                 <p
  //                   style={{
  //                     marginBottom: '15px',
  //                     position: 'absolute',
  //                     right: '15px',
  //                   }}
  //                 >
  //                   SEND
  //                 </p>
  //               </button>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''} fadedesktop`}>
      <div className="container-chat desktop">
        <div className="chat-header desktop">
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              className="back"
              style={{
                position: 'initial',
                marginTop: '13px',
                marginLeft: '11px',
              }}
            >
              <AiOutlineMenu
                onClick={toggleMenu}
                style={{ color: 'white', position: 'relative', zIndex: 9999 }}
              />
            </div>
            <Link to="/slider">
              <div>
                <GrClose
                  className="back"
                  style={{
                    color: 'white',
                    position: 'initial',
                    fontSize: '25px',
                    marginTop: '19px',
                    marginRight: '17px',
                  }}
                />
              </div>
            </Link>
          </div>

          <div style={{ width: '100%', marginBottom: '20px' }}>
            <img
              style={{
                width: '76px',
                height: '33px',
                marginTop: '17px',
                marginBottom: '0px',
                marginLeft: '5px',
              }}
              className="foto-ugo-other"
              src={require('../assets/ugo.png')}
              alt="Ugo"
            />
            <p className="desktop-profesion">{props.profesion}</p>
          </div>
        </div>
        <div className="chat desktop">
          <div className="imageBlockDesktop">
            <img
              className="desktop-stylist-chat"
              src={props.ugoImage}
              alt="Alex"
            />
          </div>
          <div className="dekstop-chat">
            <div className="dekstop-chat-block" ref={chatBlockRef}>
              <div className="chat-messages-block">
                <div className="chat desktop-chat">
                  <>
                    <div className="answerimg">
                      <img
                        className="answerImg"
                        src={props.image}
                        alt="Ugo"
                      ></img>
                    </div>
                    <div className="answer">
                      <span>
                        Hi. I am yours {props.profesion}. Ask me any questions
                        about it.
                      </span>
                    </div>
                  </>
                  {conversationHistory &&
                    conversationHistory.concat(chats).map((chat, index) => (
                      <div key={index} className="chat desktop-chat">
                        <>
                          {chat.role === 'user' && (
                            <>
                              <div className="given-letter-block">
                                <div className="givenLetter">{letter}</div>
                              </div>
                              <div className="question">{chat.content}</div>
                            </>
                          )}

                          {chat.role === 'bot' && (
                            <>
                              <div className="answerimg">
                                <img
                                  className="answerImg"
                                  src={props.image}
                                  alt="Ugo"
                                ></img>
                              </div>
                              <div className="answer">
                                <span>{chat.content}</span>
                              </div>
                            </>
                          )}
                        </>
                      </div>
                    ))}
                </div>
                {chats.map((chat, index) => (
                  <div key={index} className="chat desktop-chat">
                    <>
                      <div className="given-letter-block">
                        <div className="givenLetter">{letter}</div>
                      </div>

                      <div className="question">{chat.question}</div>
                      <div className="answerimg">
                        <img
                          className="answerImg"
                          src={props.image}
                          alt="Ugo"
                        ></img>
                      </div>

                      <div className="answer">
                        {chat.answer !== '' ? (
                          <span>
                            <Linkify
                              componentDecorator={(
                                decoratedHref,
                                decoratedText,
                                key
                              ) => (
                                <a
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={decoratedHref}
                                  key={key}
                                >
                                  {decoratedText}
                                </a>
                              )}
                            >
                              <span>{chat.answer}</span>
                            </Linkify>
                          </span>
                        ) : (
                          <>
                            <span className="loading"></span>
                            <span className="loading"></span>
                            <span className="loading"></span>
                          </>
                        )}
                      </div>
                    </>
                  </div>
                ))}
              </div>
            </div>

            <form className="form-desktop" onSubmit={handleSubmit}>
              <textarea
                autoFocus
                type="text"
                placeholder={props.placeholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                className="questionInput second"
              />

              <button
                type="submit"
                className="button-send-question"
                disabled={loading || message.trim() === ''}
              >
                <p
                  style={{
                    position: 'absolute',
                    right: '15px',
                  }}
                >
                  ENTER
                </p>
              </button>
            </form>
          </div>
        </div>
        <div
          className="navigation-section desktop"
          style={{ bottom: menuOpen ? '0px' : '-280vh' }}
        >
          <MenuDesktop
            tab1Name={props.tab1Name}
            tab2Name={props.tab2Name}
            background={props.background}
            background1={props.background1}
            link1={props.link1}
            link2={props.link2}
            setMenuOpen={setMenuOpen}
            desktopMenuLink1={props.desktopMenuLink1}
            desktopMenuLink2={props.desktopMenuLink2}
            onDownloadClick={handleDownload}
            onSoundClick={handleSoundOn}
            description={props.description}
            description1={props.description1}
            onMenuButtonClick={handleMenuButtonClick}
            onMenuDelete={handelChatDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopChat;
