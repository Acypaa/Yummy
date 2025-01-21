import React, { useState } from 'react';
import '../styles/Header.css'
import { Link } from "react-router-dom";
import "../img/HeaderLogo.svg";
import ModalWindow from './ModalWindow.js';
import { PROFILE_ROUTE } from '../utils/consts';

const Header = ({modalIsOpen, setModalIsOpen, modalActiveTab, setModalActiveTab, modalError, setModalError, openModal}) => {
  const [modalIsLoggedIn, setModalIsLoggedIn] = useState(false);

  return (
    <div>
      <div className='Header'>
        <img src="../img/HeaderLogo.svg" alt="" className='Header-Logo' />
        <div className="Header__navigation">
          <ul className='Header__list'>
            <li><Link to="/" className='Header__link'>Главная</Link></li>
            <li><Link to="/Allrecipes" className='Header__link'>Рецепты</Link></li>
            <li>
              {modalIsLoggedIn ? (
                <Link to={PROFILE_ROUTE} className='Header__link'>Профиль</Link>
              ) : (
                <button className='Header__link Header__btn' onClick={() => openModal('login')}>
                  Войти
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
      <ModalWindow isOpen={modalIsOpen} setIsOpen={setModalIsOpen} error={modalError} setError={setModalError}
      activeTab={modalActiveTab} setActiveTab={setModalActiveTab} isLoggedIn={modalIsLoggedIn} setIsLoggedIn={setModalIsLoggedIn}
      />
    </div>
  );
};

export default Header;