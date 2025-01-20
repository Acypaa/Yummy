import React, { useEffect, useState } from 'react'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import '../styles/Profile.css'; 

const UserFavorites = () => {
  const { username } = useParams(); // Получаем имя пользователя из параметров маршрута
  const [userFavorites, setUserFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
    } else {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const userFavorites = favorites.filter(favorite => favorite.username === username);
      setUserFavorites(userFavorites);
    }
  }, [username, navigate]);

  return (
    <div>
      <Header />
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
          <input type="text" className='Profile__input' placeholder='Поиск избранных' />
          <div className="favorites-list">
            {userFavorites.length > 0 ? (
              userFavorites.map(favorite => (
                <div key={favorite.id} className="favorite-item">
                  <h3>{favorite.recipeName}</h3>
                  <Link to={`/recipe/${favorite.recipeId}`}>Смотреть рецепт</Link>
                </div>
              ))
            ) : (
              <p>У этого пользователя нет избранных рецептов.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserFavorites;