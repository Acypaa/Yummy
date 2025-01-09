import React from 'react';
import '../styles/RecipesMainCircle.css';

const RecipesMainCircle = ( {title, img, className } ) => {
  return (
    <button className={className}>
      <img src={title} alt="" className="RecipesMainCircle__title"/>
      <img src={img} alt="" className="RecipesMainCircle__img"/>
    </button>
  );
};

export default RecipesMainCircle;