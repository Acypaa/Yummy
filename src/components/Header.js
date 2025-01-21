import React, { useState, useEffect } from 'react';
import '../styles/Header.css'
import { Link, useNavigate } from "react-router-dom";
import "../img/HeaderLogo.svg";
// import Modal from 'react-modal';
import ModalWindow from './ModalWindow.js';
import { PROFILE_ROUTE } from '../utils/consts';

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // пропсы проброшены
  const [modalActiveTab, setModalActiveTab] = useState('login'); // пропсы проброшены
  const [modalIsLoggedIn, setModalIsLoggedIn] = useState(false); //  пропсы проброшены
  const [modalCurrentUser, setModalCurrentUser] = useState(null); // пропсы проброшены, возможно потом переместить в ModalWindow.js (но это не точно т.к. checkAuth вероятно нужно оставить здесь или нет я не знаю. Нужно потом проверить.)
  const [modalError, setModalError] = useState(''); // пропсы проброшены
  const modalNavigate = useNavigate(); // пропс проброшен, возможно потом переместить в ModalWindow.js

  // Форма входа
  const [modalLoginForm, setModalLoginForm] = useState({ // пропсы проброшены
    username: '',
    password: ''
  });

  // Форма регистрации
  const [modalRegisterForm, setModalRegisterForm] = useState({ // пропсы проброшены
    username: '',
    password: '',
    confirmPassword: ''
  });

  const checkAuth = () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setModalIsLoggedIn(true);
      setModalCurrentUser(JSON.parse(savedUser));
    } else {
      setModalIsLoggedIn(false);
      setModalCurrentUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
    
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const openModal = (tab = 'login') => { // потом вынести в родительский компонент
    setModalActiveTab(tab);
    setModalIsOpen(true);
    setModalError('');
  };

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
      loginForm={modalLoginForm} setLoginForm={setModalLoginForm} registerForm={modalRegisterForm} setRegisterForm={setModalRegisterForm}
      activeTab={modalActiveTab} setActiveTab={setModalActiveTab} isLoggedIn={modalIsLoggedIn} setIsLoggedIn={setModalIsLoggedIn}
      currentUser={modalCurrentUser} setCurrentUser={setModalCurrentUser} navigate={modalNavigate}
      />
    </div>
  );
};

export default Header;