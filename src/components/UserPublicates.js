import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import { FRIENDS_ROUTE, FAVORITES_ROUTE } from '../utils/consts';
import '../styles/Publicates.css';

const UserPublicates = () => {
  const { username } = useParams(); // Получаем имя пользователя из параметров маршрута
  const [userRecipes, setUserRecipes] = useState([]);

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const authoredRecipes = recipes.filter(recipe => recipe.author === username);
    setUserRecipes(authoredRecipes);
  }, [username]);

  return (
    <div className="container"> {/* Контейнер для Flexbox */}
      <Header />
      <div className="Profile">
        <div className="Profile__left">
          <h2 className='Profile__heading'>{username}</h2>
          <Link to={`/friends/${username}`} className='link__friends'>
            <p className='Profile__line'>Подписки</p>
          </Link>
          <Link to={`/favorites/${username}`} className='link__friends'>
            <p className='Profile__line'>Избранное</p>
          </Link>
          <p className='Profile__line line-Friends'>Публикации</p>
          <Link to={`/profile/${username}`} className='link__friends'>
            <button className='Profile__btn'>Перейти к профилю</button>
          </Link>
        </div>
        <div className="profile__right">
          <h1 className='Profile__main-heading'>Публикации</h1>
          <div className="recipes-list">
            {userRecipes.length > 0 ? (
              userRecipes.map(recipe => (
                <div key={recipe.id} className="PublicatesCard">
                  <Link to={`/recipe/${recipe.id}`}>
                    <img src={recipe.img} alt={recipe.name} className='PublicatesCard__img' />
                    <h3 className='PublicatesCard__title'>{recipe.name}</h3>
                  </Link>
                </div>
              ))
            ) : (
              <p>У этого пользователя нет публикаций.</p>
            )}
          </div>
        </div>
      </div>
      <Footer /> {/* Футер должен быть здесь, вне Profile */}
    </div>
  );
};

export default UserPublicates;