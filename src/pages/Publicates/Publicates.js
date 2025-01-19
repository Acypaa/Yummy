
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FRIENDS_ROUTE, FAVORITES_ROUTE } from '../../utils/consts';
import '../../styles/Profile.css';

const Publicates = () => {
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
          <input type="text" className='Profile__input' placeholder='Поиск публикации' />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Publicates;