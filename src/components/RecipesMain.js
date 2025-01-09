import React from 'react';
import '../styles/RecipesMain.css';
import RecipesMainCircle from './RecipesMainCircle';
import { Link } from "react-router-dom";

const RecipesMain = () => {
  return (
    <div className='RecipesMain'>
      <div className="Circle">
        <RecipesMainCircle
         title={'./img/RecipesMainCircle/sna.svg'}
         img={'./img/RecipesMainCircle/snacks.png'}
         className="RecipesMainCircle snacks"
        />
        <RecipesMainCircle
         title={'./img/RecipesMainCircle/sal.svg'}
         img={'./img/RecipesMainCircle/salads.png'}
         className="RecipesMainCircle salads"
        />
        <RecipesMainCircle
         title={'./img/RecipesMainCircle/hot.svg'}
         img={'./img/RecipesMainCircle/hotDish.png'}
         className="RecipesMainCircle hotDish"
        />
        <RecipesMainCircle
         title={'./img/RecipesMainCircle/des.svg'}
         img={'./img/RecipesMainCircle/desserts.png'}
         className="RecipesMainCircle desserts"
        />
        <RecipesMainCircle
         title={'./img/RecipesMainCircle/sou.svg'}
         img={'./img/RecipesMainCircle/soups.png'}
         className="RecipesMainCircle soups"
        />
        <button className='Circle__btn'>
          <Link to="/AllRecipes" className='Circle__btn-link'>Посмотреть<br/> рецепты</Link>
        </button>
      </div>
      <div className="SignUp">
        <div className="SignUp__top">
          <a href="#" className='SignUp__top-link'>Зарегистрируйтесь</a>,<br/>
          чтобы начать добавлять<br/>
          рецепты
        </div>
        <img src="./img/girlMain.png" alt="" className='SignUp__girl'/>
        <div className="SignUp__bottom"></div>
      </div>
    </div>
  );
};

export default RecipesMain;