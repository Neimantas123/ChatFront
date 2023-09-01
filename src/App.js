import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './componenets/Chat.js';
import Hello from './componenets/Hello';
import HomeScreen from './componenets/HomeScreen';
import LoginForm from './componenets/LoginForm';
import Name from './componenets/Name';
import RegisterForm from './componenets/RegisterForm';
import ContentSlider from './componenets/Slider';
import 'typeface-inter';
import Terms from './componenets/Terms';
import DesktopHello from './desktop/DesktopName';
import PasswordResetForm from './componenets/ForgotPassValue';
import NewPasswordForm from './componenets/NewPasswordForm';
import Success from './componenets/Success';
import CardPassReset from './componenets/CardPassReset.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/shopper"
          element={
            <Chat
              link="shopper"
              message="Hello, I am profesional fashion shopper. How can I help you?"
              name="Ugo"
              placeholder="Ask about fashion shopping"
              image={require('./assets/desktop/Personal-shopper.png')}
              ugoImage={require('./assets/desktop/ugo-shopper.png')}
              profesion="Personal shopper"
              tab1Name="Personal stylist"
              tab2Name="Art advisor"
              background="backgroundStylist.png"
              background1="backgroundArt.png"
              link1="/stylist"
              link2="/art"
              desktopMenuLink1="ugo-dekstop-stylist-opacity-green.png"
              desktopMenuLink2="ugo-desktop-art-opacity-green.png"
              description="An online personal stylist provides personalized fashion advice and recommendations through a virtual platform. Users can receive guidance on clothing, accessories, and trends based on their style preferences, body type, and budget. The service aims to make fashion more accessible and convenient for users who may not have the time or expertise to curate their own wardrobe."
              description1="An online art advisor provides personalized guidance and recommendations to individuals looking to purchase artwork. Users can receive advice on selecting pieces that match their taste, style, and budget. The advisor may also offer insights into art trends and market developments. This service aims to make art purchasing more accessible and enjoyable for users."
            />
          }
        />
        <Route
          path="/stylist"
          element={
            <Chat
              link="stylist"
              message="Hello, I am profesional clothes stylist. How can I help you?"
              name="Ugo"
              placeholder="Ask about clothes fashion"
              image={require('./assets/desktop/Personal-stylis.png')}
              ugoImage={require('./assets/desktop/ugo-stylist.png')}
              profesion="Personal stylist"
              tab1Name="Personal shopper"
              tab2Name="Art advisor"
              background="backgroundShopper.png"
              background1="backgroundArt.png"
              link1="/shopper"
              link2="/art"
              desktopMenuLink1="ugo-desktop-shopper-opacity-green.png"
              desktopMenuLink2="ugo-desktop-art-opacity-green.png"
              description="An online personal clothes shopper helps users find and purchase clothing items that match their style and preferences. Users can share their style preferences, budget, and other criteria with the personal shopper, who then curates a selection of clothing items from various online retailers. This service aims to save users time and provide them with personalized fashion recommendations."
              description1="An online art advisor provides personalized guidance and recommendations to individuals looking to purchase artwork. Users can receive advice on selecting pieces that match their taste, style, and budget. The advisor may also offer insights into art trends and market developments. This service aims to make art purchasing more accessible and enjoyable for users."
            />
          }
        />
        <Route
          path="/art"
          element={
            <Chat
              link="art"
              message="Hello, I am profesional art advisor. How can I help you?"
              name="Ugo"
              placeholder="Ask about art"
              image={require('./assets/desktop/Personal-art.png')}
              ugoImage={require('./assets/desktop/ugo-artvisor.png')}
              profesion="Art advisor"
              tab1Name="Personal stylist"
              tab2Name="Personal shopper"
              background="backgroundStylist.png"
              background1="backgroundShopper.png"
              link1="/stylist"
              link2="/shopper"
              desktopMenuLink1="ugo-dekstop-stylist-opacity-green.png"
              desktopMenuLink2="ugo-desktop-shopper-opacity-green.png"
              description="An online personal stylist provides personalized fashion advice and recommendations through a virtual platform. Users can receive guidance on clothing, accessories, and trends based on their style preferences, body type, and budget. The service aims to make fashion more accessible and convenient for users who may not have the time or expertise to curate their own wardrobe."
              description1="An online personal clothes shopper helps users find and purchase clothing items that match their style and preferences. Users can share their style preferences, budget, and other criteria with the personal shopper, who then curates a selection of clothing items from various online retailers. This service aims to save users time and provide them with personalized fashion recommendations."
            />
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/slider"
          element={
            <ContentSlider
              stlystHasName="/hello-stylist"
              stlystHasNameMobile="/hello-personal-clothing-stylist"
              stylistHasNoName="/name-personal-clothing-stylist"
              artHasName="/hello-art"
              artHasNameMobile="/hello-personal-art-advisor"
              artHasNoName="/name-personal-art-advisor"
              shopperHasName="/hello-shopper"
              shopperHasNameMobile="/hello-personal-shopper"
              shopperHasNoName="/name-personal-shopper"
            />
          }
        />
        <Route
          path="/term"
          element={
            <Terms
              title="Terms of Use"
              date="Last updated on 1/12/2023"
              title1="1. Acceptance of Terms and Conditions"
              text1=" Acceptance of Terms and Conditions: By using this chatbot, you agree to these Terms and Conditions. If you do not agree to these Terms and Conditions, you should not use this chatbot."
              title2="2. Use of the Chatbot"
              text2=" Use of the Chatbot: You may use the chatbot for your personal or commercial purposes, provided that you do not violate any applicable laws or regulations. You may not use the chatbot in any way that may damage, disable, overburden, or impair the chatbot or interfere with any other party's use and enjoyment of the chatbot."
              title3="3. Accuracy of Information"
              text3=" Accuracy of Information: The information provided by the chatbot is for general informational purposes only. We do not guarantee the accuracy, completeness, timeliness, or reliability of any information provided by the chatbot. You should not rely solely on the information provided by the chatbot and should seek professional advice before making any decisions."
              title4="4. Privacy"
              text4="Privacy: We respect your privacy and will protect your personal information in accordance with our Privacy Policy. By using this chatbot, you consent to our collection, use, and disclosure of your personal information as described in our Privacy Policy."
              title5="5. Intellectual Property"
              text5="Intellectual Property: All content and materials available through the chatbot, including but not limited to text, graphics, logos, images, and software, are the property of the chatbot's owner or its licensors and are protected by copyright, trademark, and other intellectual property laws."
              title6="6. Termination"
              text6="Termination: We may terminate your use of the chatbot at any time without notice if you breach these Terms and Conditions or engage in any unlawful or fraudulent activity."
              title7="7. Indemnification"
              text7="Indemnification: You agree to indemnify and hold harmless the chatbot's owner and its affiliates, officers, directors, employees, and agents from any claims, damages, liabilities, and expenses, including reasonable attorneys' fees, arising out of your use of the chatbot or any breach of these Terms and Conditions."
              title8="8. Modifications"
              text8="Modifications: We reserve the right to modify these Terms and Conditions at any time without notice. Your continued use of the chatbot after any such modification constitutes your acceptance of the modified Terms and Conditions."
              title9="9. Governing Law and Jurisdiction"
              text9="Governing Law and Jurisdiction: These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which the chatbot's owner is located, without giving effect to any principles of conflicts of law. You agree to submit to the personal jurisdiction of the courts located in that jurisdiction for the purpose of litigating all such claims or disputes."
            />
          }
        />
        <Route
          path="/instruction"
          element={
            <Terms
              title="Instructions"
              title1="1. Be clear and specific"
              text1="Be clear and specific: When interacting with a chatbot, make sure your requests or questions are clear and specific. This will help the chatbot understand what you need and provide a more accurate response."
              title2="2. Follow instructions"
              text2="Follow instructions: If the chatbot provides instructions or asks for specific information, make sure to follow them. This will help the chatbot provide the best possible assistance."
              title3="3. Stay on topic"
              text3="Stay on topic: Chatbots are designed to assist with specific tasks or topics, so it's best to stick to the topic at hand. Avoid changing the subject or asking unrelated questions, as this can confuse the chatbot."
              title4="4. Be patient"
              text4="Be patient: Chatbots may take a few moments to process your request and provide a response. Be patient and wait for the chatbot to respond before asking the same question again."
            />
          }
        />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/name" element={<Name link="/hello" />} />
        <Route path="/forgot-password" element={<CardPassReset />} />
        <Route path="/forgot-password-reset" element={<PasswordResetForm />} />
        <Route path="/new-password-form" element={<NewPasswordForm />} />
        <Route path="/success" element={<Success />} />

        <Route
          path="/hello-personal-shopper"
          element={
            <Hello
              link="/shopper"
              profesion="Personal shopper"
              avatar={require('./assets/desktop/Personal-shopper.png')}
              text="fashion and/or art"
            />
          }
        />
        <Route
          path="/hello-personal-clothing-stylist"
          element={
            <Hello
              link="/stylist"
              profesion="Personal stylist"
              avatar={require('./assets/desktop/Personal-stylis.png')}
              text="fashion and/or clothing"
            />
          }
        />
        <Route
          path="/hello-personal-art-advisor"
          element={
            <Hello
              link="/art"
              profesion="Art advisor"
              avatar={require('./assets/desktop/Personal-art.png')}
              text="art"
            />
          }
        />

        <Route
          path="/name-personal-shopper"
          element={
            <Name
              link="/hello-personal-shopper"
              profesion="Personal shopper"
              avatar={require('./assets/desktop/Personal-shopper.png')}
            />
          }
        />
        <Route
          path="/name-personal-art-advisor"
          element={
            <Name
              link="/hello-personal-art-advisor"
              profesion="Personal art advisor"
              avatar={require('./assets/desktop/Personal-art.png')}
            />
          }
        />
        <Route
          path="/name-personal-clothing-stylist"
          element={
            <Name
              link="/hello-personal-clothing-stylist"
              profesion="Art advisor"
              avatar={require('./assets/desktop/Personal-stylis.png')}
            />
          }
        />

        <Route
          path="/hello-shopper"
          element={
            <DesktopHello
              chatLink="/shopper"
              image={require('./assets/desktop/ugo-shopper.png')}
              profession="personal shopper"
            />
          }
        />
        <Route
          path="/hello-stylist"
          element={
            <DesktopHello
              chatLink="/stylist"
              image={require('./assets/desktop/ugo-stylist.png')}
              profession="personal stylist"
            />
          }
        />
        <Route
          path="/hello-art"
          element={
            <DesktopHello
              chatLink="/art"
              image={require('./assets/desktop/ugo-artvisor.png')}
              profession="art advisor"
            />
          }
        />
        <Route
          path="/name-shopper"
          element={
            <Name
              link="/hello-shopper"
              avatar={require('./assets/desktop/Personal-shopper.png')}
            />
          }
        />
        <Route
          path="/name-art"
          element={
            <Name
              link="/hello-art"
              avatar={require('./assets/desktop/Personal-art.png')}
            />
          }
        />
        <Route
          path="/name-stylist"
          element={
            <Name
              link="/hello-stylist"
              avatar={require('./assets/desktop/Personal-stylis.png')}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
