import React, { useEffect, useState } from 'react'; 
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import '../styles/Profile.css'; 

const UserFavorites = () => {
  const { username } = useParams(); // Получаем имя пользователя из параметров маршрута
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения поискового запроса
  const navigate = useNavigate();
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

  // Найти рецепт по ID
  function findRecipe(id) {
    return recipes.find(r => r.id === parseInt(id));
  }


  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
        navigate('/');
    } else {
        const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || {}; // Возвращает избранное в виде объекта, в котором есть пары ключ-значение
        const userFavorites = favoritesFromStorage[username] || [];
        setFavorites(userFavorites);

        // console.log("\\/--favoritesFromStorage--\\/");
        // console.log(favoritesFromStorage); // Все избранные рецепты
        // console.log("\\/--username--\\\/");
        // console.log(username); 
        // console.log("\\/--userFavorites--\\/");
        // console.log(userFavorites); // Избранные рецепты конкретного пользователя
    }
  }, [username, navigate]);

  //Фильтрация избранных рецептов на основе поискового запроса
  const filteredFavorites = favorites.filter(favorite =>
    favorite.recipeName && favorite.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="Profile">
        <div className="Profile__left">
          <h2 className='Profile__heading'>{username}</h2>
          <Link to={`/friends/${username}`} className='link__friends'>
            <p className='Profile__line'>Подписки</p>
          </Link>
          <p className='Profile__line line-Friends'>Избранное</p>
          <Link to={`/publicates/${username}`} className='link__friends'>
            <p className='Profile__line'>Публикации</p>
          </Link>
          <Link to={`/profile/${username}`} className='link__friends'>
            <button className='Profile__btn'>Перейти к профилю</button>
          </Link>
        </div>
        <div className="profile__right">
          <h1 className='Profile__main-heading'>Избранное</h1>
          <button className='right__btn btn-friends'>Список избранных</button>
          <input 
            type="text" 
            className='Profile__input' 
            placeholder='Поиск избранных' 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <div className="recipes-list">
            {favorites.length === 0 ? (
              <p>Нет избранных рецептов.</p>
              ) : (filteredFavorites.length === 0 ? (
                <p>Избранные рецепты по поисковому запросу не найдены.</p>
                ) : (
                  filteredFavorites.map((favRecipe) => (
                    <div key={favRecipe.recipeId} className="PublicatesCard">
                      <Link to={`/recipe/${favRecipe.recipeId}`}>
                        <img src={findRecipe(favRecipe.recipeId).image} alt={favRecipe.recipeName} className='PublicatesCard__img' />
                        <h3 className='PublicatesCard__title'>{favRecipe.recipeName}</h3>
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

export default UserFavorites;