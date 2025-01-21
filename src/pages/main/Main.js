import React, {useState} from 'react';
import Header from '../../components/Header';
import WelcomeYummy from '../../components/WelcomeYummy';
import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import CenterMode from '../../components/CenterMode';
import RecipesMain from '../../components/RecipesMain';

const Main = () => {
  const [headerModalIsOpen, setHeaderModalIsOpen] = useState(false);
  const [headerModalActiveTab, setHeaderModalActiveTab] = useState('login');
  const [headerModalError, setHeaderModalError] = useState('');

  const openHeaderModal = (tab = 'login') => {
    setHeaderModalActiveTab(tab);
    setHeaderModalIsOpen(true);
    setHeaderModalError('');
  };

  return (
    <div>
      <Header modalIsOpen={headerModalIsOpen} setModalIsOpen={setHeaderModalIsOpen} modalActiveTab={headerModalActiveTab} setModalActiveTab={setHeaderModalActiveTab}
       modalError={headerModalError} setModalError={setHeaderModalError} openModal={openHeaderModal}
       />
      <WelcomeYummy />
      <Heading text={"кухни мира"} />
      <CenterMode />
      <Heading text={"рецепты"} />
      <RecipesMain openModal={openHeaderModal}/>
      <Footer />
    </div>
  );
};

export default Main;