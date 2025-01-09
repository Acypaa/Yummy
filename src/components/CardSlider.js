import React from 'react';
import '../styles/CardSlider.css';
import CardBtn from './CardBtn';

const CardSlider = ( {img, text, flag} ) => {
  return (
    <div className='CardSlider'>
      <img src={img} alt="" className='CardSlider__img'/>
      <div className="CardSlider__bg">
        <div className="CardSlider__text">
          {text}
        </div>
        <div className="CardSlider__bottom">
          <img src={flag} alt="" className='CardSlider__country'/>
          <CardBtn />
        </div>
      </div>
    </div>
  );
};

export default CardSlider;