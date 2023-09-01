import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { GrClose } from 'react-icons/gr';
import DesktopChat from '../desktop/DesktopChat';
import { AiOutlineMenu } from 'react-icons/ai';
import Menu from './Menu';
import Linkify from 'react-linkify';
import alertSound from '../assets/public/alertsound.mp3';
const webLink = process.env.REACT_APP_BACKEND_LINK;

const notificationSound = new Audio(alertSound);

const Chat = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fullChat, setFullChat] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [firstMessage, setFirstMessage] = useState();
  const [allChat, setAllChat] = useState([]);
  const [menuOpen, setMenuOpen] = useState();
  const [chatOn, setChatOn] = useState(false);
  const user = localStorage.getItem('userInfo');
  const letter = localStorage.getItem('letter');
  const [conversationHistory, setConversationHistory] = useState([]);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSoundOn = () => {
    setChatOn(!chatOn);
  };

  const handleMenuButtonClick = () => {
    setChats([]);
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
        console.log(`chat history error:  ${err}`);
      }
    };
    fetchConversationHistory();
  }, [props.link]);

  const handleSubmitFirst = async (e) => {
    e.preventDefault();
    setFirstMessage(message);
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

      if (chatOn) {
        notificationSound.play();
      }

      setChats([...chats, newChat]);
    } catch (err) {
      console.log(`sending question and getting resposne error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  useEffect(() => {
    setAllChat([chats]);
  }, [chats]);

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(allChat)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'allChat.txt';
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  // if (!firstMessage || !chats.length) {
  //   return (
  //     <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
  //       <div className="main-page mobile">
  //         <div class="close-back">
  //           <Link to="/name">
  //             <div
  //               className="back"
  //               style={{
  //                 position: 'initial',
  //                 marginTop: '13px',
  //                 marginLeft: '11px',
  //               }}
  //             >
  //               <IoIosArrowBack style={{ color: 'white' }} />
  //             </div>
  //           </Link>
  //           <div className="closeX" onClick={handleClick}>
  //             <GrClose
  //               className="back"
  //               style={{
  //                 color: 'white',
  //                 position: 'initial',
  //                 fontSize: '25px',
  //               }}
  //             />
  //           </div>
  //         </div>
  //         <div className="first">
  //           <div className="foto-ugo smaller">
  //             <img className="alex" src={props.image} alt="Alex" />
  //             <h3>Chat with</h3>
  //             <img
  //               className="foto-ugo-other"
  //               src={require('../assets/ugo.png')}
  //               alt="Ugo"
  //             />
  //             <h3 style={{ marginTop: '-5px' }}>{props.profesion}</h3>
  //           </div>
  //           <form className="chat-form first" onSubmit={handleSubmitFirst}>
  //             <div className="fixed-first">
  //               <textarea
  //                 autoFocus
  //                 type="text"
  //                 value={message}
  //                 onChange={(e) => setMessage(e.target.value)}
  //                 disabled={loading}
  //               />
  //               <button
  //                 type="submit"
  //                 disabled={loading || message.trim() === ''}
  //               >
  //                 <p>SEND</p>
  //               </button>
  //             </div>
  //           </form>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={`fade-in ${fadeIn ? 'active' : ''}`}>
      <div className="desktop">
        <DesktopChat
          link={props.link}
          placeholder={props.placeholder}
          image={props.image}
          ugoImage={props.ugoImage}
          profesion={props.profesion}
          tab1Name={props.tab1Name}
          tab2Name={props.tab2Name}
          background={props.background}
          background1={props.background1}
          link1={props.link1}
          link2={props.link2}
          setMenuOpen={setMenuOpen}
          onMenuButtonClick={handleMenuButtonClick}
          onSoundClick={handleSoundOn}
          desktopMenuLink1={props.desktopMenuLink1}
          desktopMenuLink2={props.desktopMenuLink2}
          onDownloadClick={handleDownload}
          description={props.description}
          description1={props.description1}
        />
      </div>
      <div className="chat-header mobile">
        <div className="close-back">
          <div style={{ display: 'flex' }}>
            <div
              className="back"
              style={{
                position: 'initial',
                marginTop: '13px',
                marginLeft: '11px',
              }}
            >
              <AiOutlineMenu onClick={toggleMenu} style={{ color: 'white' }} />
            </div>
          </div>
          <Link to="/slider">
            <div className="closeX">
              <GrClose
                className="back"
                style={{
                  color: 'white',
                  position: 'initial',
                  fontSize: '25px',
                }}
              />
            </div>
          </Link>
        </div>

        <div style={{ width: '100%', marginBottom: '20px' }}>
          <img
            style={{ width: '50px', height: '50px' }}
            className="alex"
            src={props.image}
            alt="Alex"
          />

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
          <p className="chat-avatar-name">{props.profesion}</p>
        </div>
        <div>{chatOn ? <div className="sound-block">sound on</div> : null}</div>
      </div>
      <div className="chat-container mobile">
        <div className="chat">
          <div className="chat-body">
            <div className="first-hello">
              <div className="answerimg">
                <img className="answerImg" src={props.image} alt="Ugo"></img>
              </div>
              <div className="answer">
                <span>
                  Hi. I am yours {props.profesion}. Ask me any questions about
                  it.
                </span>
              </div>
            </div>
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
            {chats.map((chat, index) => (
              <div key={index} className="chat">
                <>
                  <div className="given-letter-block">
                    <div className="givenLetter">{letter}</div>
                  </div>

                  <div className="question">{chat.question}</div>

                  <div style={{ width: '100%' }}>
                    <img
                      className="answerImg"
                      src={props.image}
                      alt="Ugo"
                    ></img>
                  </div>

                  <div className="answer">
                    {chat.answer !== '' ? (
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
        <div className="form">
          <form className="chat-form first" onSubmit={handleSubmitFirst}>
            <div className="fixed-first chatbox">
              <textarea
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
                style={{ resize: 'none' }}
              />
              <button
                style={{ position: 'relative' }}
                type="submit"
                disabled={loading || message.trim() === ''}
              >
                <p style={{ paddingRight: '6px', paddingTop: '17px' }}>ENTER</p>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="navigation-section"
        style={{ bottom: menuOpen ? '-1px' : '-100vh' }}
      >
        <Menu
          tab1Name={props.tab1Name}
          tab2Name={props.tab2Name}
          background={props.background}
          background1={props.background1}
          link1={props.link1}
          link2={props.link2}
          setMenuOpen={setMenuOpen}
          onMenuButtonClick={handleMenuButtonClick}
          onSoundClick={handleSoundOn}
          onDownloadClick={handleDownload}
          description={props.description}
          description1={props.description1}
        />
      </div>
    </div>
  );
};

export default Chat;
