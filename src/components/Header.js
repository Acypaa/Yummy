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

  // const closeModal = () => {
  //   setModalIsOpen(false);
  //   setError('');
  //   setLoginForm({ username: '', password: '' });
  //   setRegisterForm({ username: '', password: '', confirmPassword: '' });
  // };

  // const switchTab = (tab) => {
  //   setModalActiveTab(tab);
  //   setModalError('');
  // };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     const user = users.find(u => u.username === modalLoginForm.username);
// 
//     if (user && user.password === modalLoginForm.password) {
//       setIsLoggedIn(true);
//       setCurrentUser(user);
//       localStorage.setItem('currentUser', JSON.stringify(user));
//       closeModal();
//       navigate(PROFILE_ROUTE);
//     } else {
//       setModalError('Неверный логин или пароль');
//     }
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     if (modalRegisterForm.password !== modalRegisterForm.confirmPassword) {
//       setModalError('Пароли не совпадают');
//       return;
//     }
// 
//     const users = JSON.parse(localStorage.getItem('users') || '[]');
//     if (users.some(u => u.username === modalRegisterForm.username)) {
//       setModalError('Пользователь с таким именем уже существует');
//       return;
//     }
// 
//     const newUser = {
//       username: modalRegisterForm.username,
//       password: modalRegisterForm.password,
//       createdAt: new Date().toISOString()
//     };
// 
//     users.push(newUser);
//     localStorage.setItem('users', JSON.stringify(users));
//     localStorage.setItem('currentUser', JSON.stringify(newUser));
//     setIsLoggedIn(true);
//     setCurrentUser(newUser);
//     closeModal();
//     navigate(PROFILE_ROUTE);
//   };
// 
//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setCurrentUser(null);
//     localStorage.removeItem('currentUser');
//     navigate('/Main');
//   };

  // const modalContent = (
  //   <div className='modalContent'>
  //     {error && <div className="modal__error">{error}</div>}
  //     <div className="modal__enter" style={{ display: activeTab === 'login' ? 'block' : 'none' }}>
  //       <h2 className='modal__headings'>Вход</h2>
  //       <form onSubmit={handleLogin} className='modal__form'>
  //         <label htmlFor="login-username" className='modal__label'>Никнейм</label>
  //         <input
  //           id="login-username"
  //           type="text"
  //           placeholder='Никнейм...'
  //           className='modal__input'
  //           value={loginForm.username}
  //           onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
  //         />
  //         <label htmlFor="login-password" className='modal__label'>Пароль</label>
  //         <input
  //           id="login-password"
  //           type="password"
  //           placeholder='Пароль...'
  //           className='modal__input'
  //           value={loginForm.password}
  //           onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
  //         />
  //         <button type="submit" className='modal__btn__header'>Войти</button>
  //       </form>
  //       <p className="modal__switch">
  //         Нет аккаунта? <button onClick={() => switchTab('register')} className="modal__switch-btn">Зарегистрироваться</button>
  //       </p>
  //     </div>
  //     <div className="modal__registration" style={{ display: activeTab === 'register' ? 'block' : 'none' }}>
  //       <h2 className='modal__headings'>Регистрация</h2>
  //       <form onSubmit={handleRegister} className='modal__form'>
  //         <label htmlFor="register-username" className='modal__label'>Никнейм</label>
  //         <input
  //           id="register-username"
  //           type="text"
  //           placeholder='Никнейм...'
  //           className='modal__input'
  //           value={registerForm.username}
  //           onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
  //         />
  //         <label htmlFor="register-password" className='modal__label'>Пароль</label>
  //         <input
  //           id="register-password"
  //           type="password"
  //           placeholder='Пароль...'
  //           className='modal__input'
  //           value={registerForm.password}
  //           onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
  //         />
  //         <label htmlFor="register-confirm-password" className='modal__label'>Подтвердите пароль</label>
  //         <input
  //           id="register-confirm-password"
  //           type="password"
  //           placeholder='Подтвердите пароль...'
  //           className='modal__input'
  //           value={registerForm.confirmPassword}
  //           onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
  //         />
  //         <button type="submit" className='modal__btn__header'>Зарегистрироваться</button>
  //       </form>
  //       <p className="modal__switch">
  //         Уже есть аккаунт? <button onClick={() => switchTab('login')} className="modal__switch-btn">Войти</button>
  //       </p>
  //     </div>
  //     <button onClick={closeModal} className='modal__close'></button>
  //   </div>
  // );

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
      {/* <Modal  */}
      {/*   isOpen={modalIsOpen}  */}
      {/*   onRequestClose={closeModal} */}
      {/*   style={{ */}
      {/*     overlay: { */}
      {/*       backgroundColor: 'rgba(0,0,0,0.5)', */}
      {/*       backdropFilter: 'blur(3px)' */}
      {/*     }, */}
      {/*     content: { */}
      {/*       width: '840px', */}
      {/*       height: '477px', */}
      {/*       margin: '0 auto', */}
      {/*       marginTop: '104px', */}
      {/*       backgroundColor: 'rgba(123, 138, 111, 0.95)', */}
      {/*       border: 'none', */}
      {/*       boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.3)', */}
      {/*       borderRadius: '20px', */}
      {/*       padding: '30px' */}
      {/*     } */}
      {/*   }} */}
      {/* > */}
      {/*   {modalContent} */}
      {/* </Modal> */}
      <ModalWindow isOpen={modalIsOpen} setIsOpen={setModalIsOpen} error={modalError} setError={setModalError}
      loginForm={modalLoginForm} setLoginForm={setModalLoginForm} registerForm={modalRegisterForm} setRegisterForm={setModalRegisterForm}
      activeTab={modalActiveTab} setActiveTab={setModalActiveTab} isLoggedIn={modalIsLoggedIn} setIsLoggedIn={setModalIsLoggedIn}
      currentUser={modalCurrentUser} setCurrentUser={setModalCurrentUser} navigate={modalNavigate}
      />
    </div>
  );
};

export default Header;