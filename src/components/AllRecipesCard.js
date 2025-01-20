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