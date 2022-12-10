import './Main.css';
import React from 'react';
import Header from '../Header/Header';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Footer from '../Footer/Footer';

function Main({ isLoggedIn, onMobileMenu, authorizationEmail}) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} onMobileMenu={onMobileMenu} authorizationEmail={authorizationEmail}/>
      <main className='main'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;
