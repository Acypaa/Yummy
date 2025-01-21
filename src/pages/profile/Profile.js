import React, { useEffect, useState } from 'react'; 
import Header from '../../components/Header';
import { Link, useNavigate } from 'react-router-dom'; 
import Footer from '../../components/Footer';
import '../../styles/Profile.css';
import { FRIENDS_ROUTE, FAVORITES_ROUTE, PUBLICATES_ROUTE } from '../../utils/consts'; 


const Profile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
    } else {
      setUsername(JSON.parse(user).username);
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
            <p className='Profile__line line-Friends'>Подписки</p>
          </Link>
          <Link to={FAVORITES_ROUTE} className='link__favorites'>
            <p className='Profile__line'>Избранное</p>
          </Link>
          <Link to={PUBLICATES_ROUTE} className='link__publicates'>
            <p className='Profile__line'>Публикации</p>
          </Link>
          <button className='Profile__btn' onClick={handleLogout}>Выход</button>
        </div>
        <div className="profile__right">
          <h1 className='Profile__main-heading'>Профиль</h1>
          {/* <button className='right__btn'>Публикации</button>
          <button className='right__btn'>Избранное</button>
          <input type="text" className='Profile__input' placeholder='Поиск рецепта' /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;