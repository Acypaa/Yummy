import React from 'react';
import '../styles/Footer.css';
import "../img/HeaderLogo.svg";

const Footer = () => {
  return (
    <div className='Footer'>
      <div className="Footer-inner">
        <img src="../img/HeaderLogo.svg" alt="" className='Footer__logo'/>
        <div className="Footer__info">
          Саратов, 2024
        </div>
      </div>
    </div>
  );
};

export default Footer;