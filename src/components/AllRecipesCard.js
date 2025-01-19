// import React, {useContext, useState} from 'react';
// import '../styles/AllRecipesCard.css';
// import {useNavigate, Link, Route, Routes, BrowserRouter} from "react-router-dom";
// import {RECIPE_ROUTE} from '../utils/consts';
// import Recipe from '../pages/recipe/Recipe';


// const AllRecipesCard = ( {recipe} ) => {
//   //const navigate = useNavigate()
  
//   return (
//     <Link to={RECIPE_ROUTE + '/' + recipe.id}>
//       <button className='AllRecipesCard'>
//         <img src={recipe.img} alt="" className='AllRecipesCard__img'/>
//         <div className="AllRecipesCard__title">{recipe.name}</div>
//       </button>
//     </Link>
//   );
// };

// export default AllRecipesCard;


import React from 'react';
import '../styles/AllRecipesCard.css';
import { Link } from "react-router-dom";
import { RECIPE_ROUTE } from '../utils/consts';

const AllRecipesCard = ({ recipe }) => {
    return (
        <Link to={RECIPE_ROUTE + '/' + recipe.id}>
            <button className='AllRecipesCard'>
                <img src={recipe.image} alt="" className='AllRecipesCard__img'/>
                <div className="AllRecipesCard__title">{recipe.name}</div>
            </button>
        </Link>
    );
};

export default AllRecipesCard;