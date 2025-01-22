import React, {useState} from 'react';
import WelcomeYummy from '../../components/WelcomeYummy';
import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import CenterMode from '../../components/CenterMode';
import RecipesMain from '../../components/RecipesMain';

const Main = ({openModal, isLoggedIn, setIsLoggedIn}) => {
  return (
    <div>
      <WelcomeYummy />
      <Heading text={"кухни мира"} />
      <CenterMode />
      <Heading text={"рецепты"} />
      <RecipesMain isLoggedIn={isLoggedIn} openModal={openModal}/>
      <Footer />
    </div>
  );
};

export default Main;