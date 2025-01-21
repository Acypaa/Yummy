import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { PROFILE_ROUTE } from '../utils/consts';
import { useNavigate } from "react-router-dom";


const ModalWindow = ({isOpen, setIsOpen, error, setError, activeTab, setActiveTab, isLoggedIn, setIsLoggedIn}) => {

  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Форма входа
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  // Форма регистрации
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const checkAuth = () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setIsLoggedIn(true);
      setCurrentUser(JSON.parse(savedUser));
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
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

  const closeModal = () => {
    setIsOpen(false);
    setError(''); 
    setLoginForm({ username: '', password: '' });
    setRegisterForm({ username: '', password: '', confirmPassword: '' });
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.username === loginForm.username);

    if (user && user.password === loginForm.password) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      closeModal();
      navigate(PROFILE_ROUTE);
    } else {
      setError('Неверный логин или пароль');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.username === registerForm.username)) {
      setError('Пользователь с таким именем уже существует');
      return;
    }

    const newUser = {
      username: registerForm.username,
      password: registerForm.password,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setIsLoggedIn(true);
    setCurrentUser(newUser);
    closeModal();
    navigate(PROFILE_ROUTE);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    navigate('/Main');
  };

  const modalContent = (
    <div className='modalContent'>
      {error && <div className="modal__error">{error}</div>}
      <div className="modal__enter" style={{ display: activeTab === 'login' ? 'block' : 'none' }}>
        <h2 className='modal__headings'>Вход</h2>
        <form onSubmit={handleLogin} className='modal__form'>
          <label htmlFor="login-username" className='modal__label'>Никнейм</label>
          <input
            id="login-username"
            type="text"
            placeholder='Никнейм...'
            className='modal__input'
            value={loginForm.username}
            onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
          />
          <label htmlFor="login-password" className='modal__label'>Пароль</label>
          <input
            id="login-password"
            type="password"
            placeholder='Пароль...'
            className='modal__input'
            value={loginForm.password}
            onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
          />
          <button type="submit" className='modal__btn__header'>Войти</button>
        </form>
        <p className="modal__switch">
          Нет аккаунта? <button onClick={() => switchTab('register')} className="modal__switch-btn">Зарегистрироваться</button>
        </p>
      </div>
      <div className="modal__registration" style={{ display: activeTab === 'register' ? 'block' : 'none' }}>
        <h2 className='modal__headings'>Регистрация</h2>
        <form onSubmit={handleRegister} className='modal__form'>
          <label htmlFor="register-username" className='modal__label'>Никнейм</label>
          <input
            id="register-username"
            type="text"
            placeholder='Никнейм...'
            className='modal__input'
            value={registerForm.username}
            onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
          />
          <label htmlFor="register-password" className='modal__label'>Пароль</label>
          <input
            id="register-password"
            type="password"
            placeholder='Пароль...'
            className='modal__input'
            value={registerForm.password}
            onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
          />
          <label htmlFor="register-confirm-password" className='modal__label'>Подтвердите пароль</label>
          <input
            id="register-confirm-password"
            type="password"
            placeholder='Подтвердите пароль...'
            className='modal__input'
            value={registerForm.confirmPassword}
            onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
          />
          <button type="submit" className='modal__btn__header'>Зарегистрироваться</button>
        </form>
        <p className="modal__switch">
          Уже есть аккаунт? <button onClick={() => switchTab('login')} className="modal__switch-btn">Войти</button>
        </p>
      </div>
      <button onClick={closeModal} className='modal__close'></button>
    </div>
  );

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(3px)'
        },
        content: {
          width: '840px',
          height: '477px',
          margin: '0 auto',
          marginTop: '104px',
          backgroundColor: 'rgba(123, 138, 111, 0.95)',
          border: 'none',
          boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.3)',
          borderRadius: '20px',
          padding: '30px'
        }
      }}
    >
      {modalContent}
    </Modal>
    );
  };

export default ModalWindow;