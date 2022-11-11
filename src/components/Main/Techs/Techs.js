import './Techs.css';

function Techs() {
  return (
    <section className='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <h3 className='techs__topic'>7 технологий</h3>
      <p className='techs__about'>
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>
      <ul className='techs__techs-stack'>
        <li className='techs__one-of-them app__buttons'>HTML</li>
        <li className='techs__one-of-them app__buttons'>CSS</li>
        <li className='techs__one-of-them app__buttons'>JS</li>
        <li className='techs__one-of-them app__buttons'>React</li>
        <li className='techs__one-of-them app__buttons'>Git</li>
        <li className='techs__one-of-them app__buttons'>Express.js</li>
        <li className='techs__one-of-them app__buttons'>mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
