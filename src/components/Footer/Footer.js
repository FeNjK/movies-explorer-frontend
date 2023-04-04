import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <article className='footer__info'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </article>
      <nav className='footer__content'>
        <p className='footer__copyright-symbol'>&copy; 2022</p>
        <ul className='footer__links'>
          <li className='footer__link'>
            <a
              href='https://practicum.yandex.ru'
              className='footer__link-address app__links'
              target='_blank'
              rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__link'>
            <a
              className='footer__link-address app__links'
              href='https://github.com'
              target='_blank'
              rel='noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;
