import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/Profile.css';
import {Link} from "react-router-dom";
import { FRIENDS_ROUTE } from '../../utils/consts';

const Profile = () => {
  return (
    <div>
      <Header />
      <div className="Profile">
        <div className="Profile__left">
          <h2 className='Profile__heading'>Никнейм</h2>
          <Link to={FRIENDS_ROUTE} className='link__friends'>
          <p className='Profile__line line-Friends'>Друзья</p>
          </Link>
          <p className='Profile__line'>Избранное</p>
          <p className='Profile__line'>Мои публикации</p>
          <button  className='Profile__btn'>Выход</button>
        </div>
        <div className="profile__right">
          <h1 className='Profile__main-heading'>Мой профиль</h1>
          <button className='right__btn'>Мои публикации</button>
          <button className='right__btn'>Сохраненное</button>
          <input type="text" className='Profile__input' placeholder='Поиск рецепта' />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;