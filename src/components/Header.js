import React, { useState } from 'react';
import '../styles/Header.css'
import { Link } from "react-router-dom";
import "../img/HeaderLogo.svg";
import Modal from 'react-modal';
import { PROFILE_ROUTE } from '../utils/consts';

const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalContent = (
    <div className='modalContent'>
      <div className="modal__enter">
        <h2 className='modal__headings'>Вход</h2>
        <form action="" className='modal__form'>
          <label htmlFor="" className='modal__label'>Никнейм</label>
          <input type="text" placeholder='Никнейм...' className='modal__input'/>
          <label htmlFor="" className='modal__label'>Пароль</label>
          <input type="password" placeholder='Пароль...' className='modal__input'/>
          <Link to={PROFILE_ROUTE}>
          <button className='modal__btn__header'>Войти</button>
          </Link>
        </form>
      </div>
      <div className="modal__registration">
        <h2 className='modal__headings'>Регистрация</h2>
        <form action=""  className='modal__form'>
          <label htmlFor="" className='modal__label'>Никнейм</label>
          <input type="text" placeholder='Никнейм...' className='modal__input'/>
          <label htmlFor="" className='modal__label'>Пароль</label>
          <input type="password" placeholder='Пароль...' className='modal__input'/>
          <button className='modal__btn__header'>Зарегистрироваться</button>
        </form>
      </div>
      <button onClick={closeModal} className='modal__close'></button>
    </div>
  );

  return (
    <div className='Header'>
      <img src="../img/HeaderLogo.svg" alt="" className='Header-Logo' />
      <div className="Header__navigation">
        <ul className='Header__list'>
          <li><Link to="/Main" className='Header__link'>Главная</Link></li>
          <li><Link to="/AllRecipes" className='Header__link'>Рецепты</Link></li>
          <li><button className='Header__link Header__btn' onClick={openModal}>Войти</button></li>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
            style={{
              overlay:{
                backgroundColor: 'rgba(0,0,0,0)',
                backdropFilter: 'Blur(0.5px)'
              },
              content:{
                width: '840px',
                height: '477px',
                margin: '0 auto',
                marginTop: '104px',
                backgroundColor: 'rgba(123, 138, 111, 0.95)',
                border: 'none',
                boxShadow: '0px 4px 10px 0px rgba(0,0,0,0.3)',
              }
            }}
          >
            {modalContent}
          </Modal>
        </ul>
      </div>
    </div>
  );
};

export default Header;