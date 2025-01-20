import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { FRIENDS_ROUTE, PUBLICATES_ROUTE } from '../../utils/consts';
import '../../styles/Profile.css';

const Favorites = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
    } else {
      setUsername(JSON.parse(user).username);
      
      const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
      const userFavorites = favorites[JSON.parse(user).username] || [];
      setFavorites(userFavorites);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    window.location.reload();
    navigate('/'); 
  };

  return (
    <div>
      <Header />
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
          <div className="favorites-container">
            {favorites.length > 0 ? (
              favorites.map((recipe, index) => (
                <div key={index} className="recipe-card">
                  <h3>{recipe.recipeName}</h3>
                  <Link to={`/recipe/${recipe.recipeId}`}>
                    <img src={`path/to/your/img/${recipe.recipeId}.jpg`} alt={recipe.recipeName} />
                  </Link>
                </div>
              ))
            ) : (
              <p>Нет избранных рецептов.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;