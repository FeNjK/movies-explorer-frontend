import './AboutProject.css';
import { createRef } from 'react';

function AboutProject(props) {
  let goTo = createRef();

  return (
    <section className='about-project'>
      <h2 className='about-project__title' ref={goTo}>
        О проекте
      </h2>
      <ul className='about-project__elements'>
        <li className='about-project__element'>
          <h3 className='about-project__element-title'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__element-paragraph'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className='about-project__element'>
          <h3 className='about-project__element-title'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__element-paragraph'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <article className='about-project__training-period'>
        <div className='about-project__first-training-part'>
          <p className='about-project__training-period_text'>1 неделя</p>
        </div>
        <div className='about-project__second-training-part'>
          <p className='about-project__training-period_text'>4 недели</p>
        </div>
        <div className='about-project__description-first-training-part'>
          <p className='about-project__training-period_text'>Back-end</p>
        </div>
        <div className='about-project__description-second-training-part'>
          <p className='about-project__training-period_text'>Front-end</p>
        </div>
      </article>
    </section>
  );
}

export default AboutProject;
