import React from 'react';
import '../styles/WelcomeYummy.css'
import { Link } from "react-router-dom";

const WelcomeYummy = () => {
  return (
    <div className='WelcomeYummy'>
      <div className="WelcomeYummy-inner">
        <div className="WelcomeYummy-inner__left">
          <div className="WelcomeYummy__heading">
            Yummy
          </div>
          <div className="WelcomeYummy__about">
            САЙТ ДЛЯ ТЕХ, КТО ИЩЕТ<br/>
            ВКУСНЫЕ РЕЦЕПТЫ
          </div>
          <button className='WelcomeYummy__button'>
            <Link to="/AllRecipes" className='WelcomeYummy__button'>Рецепты</Link>
          </button>
        </div>
        <div className="WelcomeYummy-inner__right">
          <img src="./img/WelcomeYummy.png" alt="" className='WelcomeYummy__img'/>
        </div>
      </div>
    </div>
  );
};

export default WelcomeYummy;