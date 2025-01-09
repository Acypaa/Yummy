import React, { useState } from 'react';
import '../styles/AllRecipesNav.css';
import Modal from 'react-modal';

const AllRecipesNav = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const modalContent = (
    <div>
      <h2 className='modal__top'>Фильтры</h2>
      <h3 className='modal__heading'>Тип блюда</h3>
      <div className="modal__btns">
        <button className='modal__btn'>Первые блюда</button>
        <button className='modal__btn'>Вторые Блюда</button>
        <button className='modal__btn'>Салаты</button>
        <button className='modal__btn'>Закуски</button>
        <button className='modal__btn'>Выпечка</button>
        <button className='modal__btn'>Десерты</button>
      </div>
      <h3 className='modal__heading'>Кухня мира</h3>
      <select name="country" id="country-select" className='modal__select'>
        <option value="">Например, Русская..</option>
        <option value="">Французская кухня</option>
        <option value="">Итальянская кухня</option>
        <option value="">Грузинская кухня</option>
        <option value="">Узбекская кухня</option>
        <option value="">Корейская кухня</option>
        <option value="">Японская кухня</option>
        <option value="">Китайская кухня</option>
      </select>
      <button onClick={closeModal} className='modal__close-btn'></button>
    </div>
  );

  return (
    <div className='AllRecipesNav'>
      <button className='AllRecipesNav__btn' onClick={openModal}>Фильтры</button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}
        style={{content:{
          width: '699px',
          height: '449px',
          margin: '0 auto',
          marginTop: '140px',
          borderRadius: '30px',
          backgroundColor: 'rgba(239, 231, 221, 1)',
          border: 'none',
          boxShadow: '0px 4px 14px 0px rgba(0,0,0,0.25)'
        },
        overlay:{
          backgroundColor: 'rgba(239, 231, 221, 0)',
          backdropFilter: 'blur(0.7px)'
        }
      }}
      >
        {modalContent}
      </Modal>
      <button className='AllRecipesNav__btn'>Добавить</button>
      <form action="" className='AllRecipesNav__form'>
        <input type="text" placeholder='поиск рецепта...' className='AllRecipesNav__input'/>
        <button  className='AllRecipesNav__form-btn'>найти</button>
      </form>
    </div>
  );
};

export default AllRecipesNav;