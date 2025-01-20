// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from "react-router-dom";
// import { FRIENDS_ROUTE, FAVORITES_ROUTE } from '../../utils/consts';
// import '../../styles/Publicates.css';

// const Publicates = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [userRecipes, setUserRecipes] = useState([]);

//   useEffect(() => {
//     const user = localStorage.getItem('currentUser');
//     if (!user) {
//       navigate('/');
//     } else {
//       const currentUser = JSON.parse(user);
//       setUsername(currentUser.username);
//       const recipes = JSON.parse(localStorage.getItem('recipes')) || [];
//       const authoredRecipes = recipes.filter(recipe => recipe.author === currentUser.username);
//       setUserRecipes(authoredRecipes);
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('currentUser');
//     navigate('/'); 
//   };

//   return (
//     <div className="container"> {/* Контейнер для Flexbox */}
//       <Header />
//       <div className="Profile">
//         <div className="Profile__left">
//           <h2 className='Profile__heading'>{username}</h2>
//           <Link to={FRIENDS_ROUTE} className='link__friends'>
//             <p className='Profile__line'>Подписки</p>
//           </Link>
//           <Link to={FAVORITES_ROUTE} className='link__friends'>
//             <p className='Profile__line'>Избранное</p>
//           </Link>
//           <p className='Profile__line line-Friends'>Публикации</p>
//           <button className='Profile__btn' onClick={handleLogout}>Выход</button>
//         </div>
//         <div className="profile__right">
//           <h1 className='Profile__main-heading'>Публикации</h1>
//           <button className='right__btn btn-friends'>Список публикаций</button>
//           <input type="text" className='Profile__input' placeholder='Поиск публикации' />
//           <div className="recipes-list">
//             {userRecipes.length > 0 ? (
//               userRecipes.map(recipe => (
//                 <div key={recipe.id} className="PublicatesCard">
//                   <Link to={`/recipe/${recipe.id}`}>
//                     <img src={recipe.img} alt={recipe.name} className='PublicatesCard__img' />
//                     <h3 className='PublicatesCard__title'>{recipe.name}</h3>
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               <p>У вас нет публикаций.</p>
//             )}
//           </div>
//         </div>
//       </div>
//       <Footer /> {/* Футер должен быть здесь, вне Profile */}
//     </div>
//   );
// };

// export default Publicates;
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FRIENDS_ROUTE, FAVORITES_ROUTE } from '../../utils/consts';
import '../../styles/Publicates.css';

const Publicates = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [userRecipes, setUserRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения поискового запроса

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

  // Фильтруем рецепты на основе поискового запроса
  const filteredRecipes = userRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container"> {/* Контейнер для Flexbox */}
      <Header />
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
            onChange={(e) => setSearchTerm(e.target.value)} // Обновляем состояние поискового запроса
          />
          <div className="recipes-list">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <div key={recipe.id} className="PublicatesCard">
                  <Link to={`/recipe/${recipe.id}`}>
                    <img src={recipe.img} alt={recipe.name} className='PublicatesCard__img' />
                    <h3 className='PublicatesCard__title'>{recipe.name}</h3>
                  </Link>
                </div>
              ))
            ) : (
              <p>У вас нет публикаций.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Publicates;