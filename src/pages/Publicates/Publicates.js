import Footer from '../../components/Footer';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FRIENDS_ROUTE, FAVORITES_ROUTE } from '../../utils/consts';
import '../../styles/Publicates.css';

const Publicates = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
    } else {
      const currentUser = JSON.parse(user);
      setUsername(currentUser.username);
      const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
      const authoredRecipes = recipes.filter(recipe => recipe.author === currentUser.username);
      setUserRecipes(authoredRecipes);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/'); 
  };

  const filteredRecipes = userRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <div className="Profile">
        <div className="Profile__left">
          <h2 className='Profile__heading'>{username}</h2>
          <Link to={FRIENDS_ROUTE} className='link__friends'>
            <p className='Profile__line'>Подписки</p>
          </Link>
          <Link to={FAVORITES_ROUTE} className='link__friends'>
            <p className='Profile__line'>Избранное</p>
          </Link>
          <p className='Profile__line line-Friends'>Публикации</p>
          <button className='Profile__btn' onClick={handleLogout}>Выход</button>
        </div>
        <div className="profile__right">
          <h1 className='Profile__main-heading'>Публикации</h1>
          <button className='right__btn btn-friends'>Список публикаций</button>
          <input 
            type="text" 
            className='Profile__input' 
            placeholder='Поиск публикации' 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <div className="recipes-list">
          {userRecipes.length === 0 ? (
              <p>У вас нет публикаций.</p>
              ) : (filteredRecipes.length === 0 ? (
                <p>Рецепт с таким названием у вас не найден.</p>
                ) : (
                filteredRecipes.map(recipe => (
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

export default Publicates;