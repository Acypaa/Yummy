import Header from '../components/Header';
import Footer from '../components/Footer';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import '../styles/Publicates.css';

const UserPublicates = () => {
  const { username } = useParams(); // Получаем имя пользователя из параметров маршрута
  const [userRecipes, setUserRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения поискового запроса

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const authoredRecipes = recipes.filter(recipe => recipe.author === username);
    setUserRecipes(authoredRecipes);
  }, [username]);

  // Фильтруем рецепты на основе поискового запроса
  const filteredRecipes = userRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container"> 
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
          <button className='right__btn btn-friends'>Список публикаций</button>
          <input 
            type="text" 
            className='Profile__input' 
            placeholder='Поиск публикации' 
            onChange={(e) => setSearchTerm(e.target.value)} // Обновляем состояние поискового запроса
          />
          <div className="recipes-list">
            {userRecipes.length === 0 ? (
              <p>У этого пользователя нет публикаций.</p>
              ) : (filteredRecipes.length === 0 ? (
                <p>Рецепт с таким названием не найден у данного пользователя.</p>
                ) : (filteredRecipes.map(recipe => (
                  <div key={recipe.id} className="PublicatesCard">
                    <Link to={`/recipe/${recipe.id}`}>
                      <img src={recipe.img} alt={recipe.name} className='PublicatesCard__img' />
                      <h3 className='PublicatesCard__title'>{recipe.name}</h3>
                    </Link>
                  </div>
                  ))
                )
            )}
          </div>
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default UserPublicates;