import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { FRIENDS_ROUTE, PUBLICATES_ROUTE } from '../../utils/consts';
import '../../styles/Profile.css';

const Favorites = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [favorites, setFavorites] = useState([]);
  const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
  const [searchTerm, setSearchTerm] = useState(''); 

  // Найти рецепт по ID
  function findRecipe(id) {
    return recipes.find(r => r.id === parseInt(id));
  }


  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
    } else {
      const userData = JSON.parse(user);
      setUsername(userData.username); 

      const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || {};
      const userFavorites = favoritesFromStorage[JSON.parse(user).username] || [];
      setFavorites(userFavorites);
    }
  }, [navigate]);

  const filteredFavorites = favorites.filter(favRecipe =>
    favRecipe.recipeName && favRecipe.recipeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
    navigate('/'); 
  };

  return (
    <div>
      <div className="Profile">
        <div className="Profile__left">
          <h2 className='Profile__heading'>{username}</h2>
          <Link to={FRIENDS_ROUTE} className='link__friends'>
            <p className='Profile__line'>Подписки</p>
          </Link>
          <p className='Profile__line line-Friends'>Избранное</p>
          <Link to={PUBLICATES_ROUTE} className='link__friends'>
            <p className='Profile__line'>Публикации</p>
          </Link>
          <button className='Profile__btn' onClick={handleLogout}>Выход</button>
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

export default Favorites;