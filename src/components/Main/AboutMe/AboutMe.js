import './AboutMe.css';
import myPhoto from '../../../images/Моё_фото.jpg';
import linkImage from '../../../images/Стрелка ссылки.svg';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__characteristic'>
        <h3 className='about-me__name'>Андрей</h3>
        <p className='about-me__profession'>
          Инженер пожарной безопасности, 33 года
        </p>
        <p className='about-me__description'>
          Родился в городе Задонске Липецкой области. Был&nbsp;женат, разведен,
          есть дочка. Закончил Академию ГПС МЧС&nbsp;России. Работал в ГУ
          "Национальный центр управления в кризисных ситуациях". Спустя 12 лет
          службы уволился по собственному желанию. Далее&nbsp;работал
          самозанятым, участвовал в разработке проектной документации в области
          обеспечения пожарной безопасности в строительстве. В поиске себя решил
          освоить профессию "веб-разработчик" и&nbsp;в&nbsp;процессе учебы
          понял, что это&nbsp;- "моё!".
        </p>
        <a
          href='https://github.com/FeNjK'
          className='about-me__git-hub-link app__links'
          target='_blank'
          rel='noreferrer'
        >
          Github
        </a>
        <img className='about-me__my-photo' src={myPhoto} alt='Моё фото' />
      </div>
      <h4 className='about-me__portfolio'>Портфолио</h4>
      <ul className='about-me__portfolio-link-container'>
        <li className='about-me__portfolio-link-blok app__links'>
          <a
            href='https://github.com/FeNjK/First-project'
            className='about-me__portfolio-link'
            target='_blank'
            rel='noreferrer'
          >
            <p className='about-me__portfolio-link-name'>Статичный сайт</p>
            <img
              className='about-me__portfolio-link-image'
              src={linkImage}
              alt='Изображение ссылки'
            />
          </a>
        </li>
        <li className='about-me__portfolio-link-blok app__links'>
          <a
            href='https://github.com/FeNjK/russian-travel'
            className='about-me__portfolio-link'
            target='_blank'
            rel='noreferrer'
          >
            <p className='about-me__portfolio-link-name'>Адаптивный сайт</p>
            <img
              className='about-me__portfolio-link-image'
              src={linkImage}
              alt='Изображение ссылки'
            />
          </a>
        </li>
        <li className='about-me__portfolio-link-blok app__links'>
          <a
            href='https://github.com/FeNjK/mesto'
            className='about-me__portfolio-link'
            target='_blank'
            rel='noreferrer'
          >
            <p className='about-me__portfolio-link-name'>
              Одностраничное приложение
            </p>
            <img
              className='about-me__portfolio-link-image'
              src={linkImage}
              alt='Изображение ссылки'
            />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
