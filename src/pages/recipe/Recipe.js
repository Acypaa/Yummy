import React, {useEffect, useState, useContext} from 'react';
import '../../styles/Recipe.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useParams } from 'react-router-dom';
//import {fetchOneRecipe} from "../../http/recipeAPI";
import {observer} from "mobx-react-lite";
//import "../../recipes/1.json"
import { Context } from '../../index';
import { useLocation } from 'react-router-dom';
import {recipe} from '../../recipes'


const Recipe = () => {
  //const [recipe, setRecipe] = useState({info: []})
  const {id} = useParams()
  //useEffect(() => {
  //    fetchOneRecipe(id).then(data => setRecipe(data))
  //}, [])
  //const {recipe} = useContext(Context);
  //const location = useLocation();
  //const { from } = location.state;
  const recipes = recipe;

  return (
    <div className='Recipe'>
      <Header img={recipes[id-1].logo}/>
      <h1 className='Recipe__title'>{recipes[id-1].name}</h1>
      <div className="Recipe__top">
        <img src={recipes[id-1].img} alt="" className='Recipe__top-img'/>
        <div className="top__right">
          <div className='top__right-author'>Автор:{recipes[id-1].kitchen}</div>
          <button className='top__right-btn'>В избранное <img src="../img/Recipe/fav.png" alt="" /></button>
          <button className='top__right-btn'>Поделиться <img src="../img/Recipe/repost.png" alt="" /></button>
          <button className='top__right-btn'>Комментарии <img src="../img/Recipe/comment.png" alt="" /></button>
        </div>
      </div>
      <div className="Recipe__about">
        <div className="about__top">
          <div className="all-time">
            <div className="about__title">Время приготовления</div>
            <div className="about-info">
              <img src="../img/Recipe/all-time.png" alt="" />
              <div className="about-info__text">{recipes[id-1].time}</div>
            </div>
          </div>
          <div className="time-on-kitchen">
            <div className="about__title">Время на кухне</div>
            <div className="about-info">
              <img src="../img/Recipe/time-on-kitchen.png" alt="" />
              <div className="about-info__text">{recipes[id-1].timeOnKitchen}</div>
            </div>
          </div>
        </div>
        <div className="about__bottom">
          <div className="kitchen">
            <div className="about__title">Кухня</div>
            <div className="about-info">
              <img src={recipes[id-1].imgFlag} alt="" />
              <div className="about-info__text">{recipes[id-1].country}</div>
            </div>
          </div>
          <div className="slices">
            <div className="about__title">Количество порций</div>
            <div className="about-info">
              <img src="../img/Recipe/slices.png" alt="" />
              <div className="about-info__text">{recipes[id-1].quantity}</div>
            </div>
          </div>
        </div>
      </div>
      <h2 className='Recipe__title-second'>Ингредиенты</h2>
      <div className="ingredients ingredients-text">
      {recipes[id-1].ingredients}
      </div>
      <h2 className='Recipe__title-second'>Шаги</h2>
      <div className="Recipe__steps">
        {recipes[id-1].steps}
      </div>
      <Footer />
    </div>
  );
};

export default Recipe;