import React from 'react';
import '../styles/Heading.css';

const Heading = ( { text } ) => {
  return (
    <div className='Heading'>
      <div className="Heading__line"></div>
      <div className="Heading__text">{text}</div>
      <div className="Heading__line"></div>
    </div>
  );
};

export default Heading;