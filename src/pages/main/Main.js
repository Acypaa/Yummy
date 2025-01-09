import React from 'react';
import Header from '../../components/Header';
import WelcomeYummy from '../../components/WelcomeYummy';
import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import CenterMode from '../../components/CenterMode';
import RecipesMain from '../../components/RecipesMain';

const Main = () => {
  return (
    <div>
      <Header />
      <WelcomeYummy />
      <Heading text={"кухни мира"} />
      <CenterMode />
      <Heading text={"рецепты"} />
      <RecipesMain />
      <Footer />
    </div>
  );
};

export default Main;