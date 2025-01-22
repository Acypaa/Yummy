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
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
    } else {
      const favoritesFromStorage = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(favoritesFromStorage); 

      const userData = JSON.parse(user);
      setUsername(userData.username); 
    }
  }, [navigate]);

  const filteredFavorites = favorites.filter(recipe =>
    recipe.name && recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <button className='right__btn btn-friends'>Список избранных</button>
          <input 
            type="text" 
            className='Profile__input' 
            placeholder='Поиск избранных' 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <div className="recipes-list">
            {filteredFavorites.length > 0 ? (
              filteredFavorites.map(recipe => (
                <div key={recipe.id} className="PublicatesCard">
                  <Link to={`/recipe/${recipe.id}`}>
                    <img src={recipe.img} alt={recipe.name} className='PublicatesCard__img' />
                    <h3 className='PublicatesCard__title'>{recipe.name}</h3>
                  </Link>
                </div>
              ))
            ) : (
              <p>У вас нет избранных рецептов.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Favorites;