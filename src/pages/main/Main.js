import React, {useState} from 'react';
import WelcomeYummy from '../../components/WelcomeYummy';
import Heading from '../../components/Heading';
import Footer from '../../components/Footer';
import CenterMode from '../../components/CenterMode';
import RecipesMain from '../../components/RecipesMain';

const Main = ({openHeaderModal,modalIsLoggedIn, setModalIsLoggedIn}) => {
//   const [headerModalIsOpen, setHeaderModalIsOpen] = useState(false);
//   const [headerModalActiveTab, setHeaderModalActiveTab] = useState('login');
//   const [headerModalError, setHeaderModalError] = useState('');
// 
//   const openHeaderModal = (tab = 'login') => {
//     setHeaderModalActiveTab(tab);
//     setHeaderModalIsOpen(true);
//     setHeaderModalError('');
//   };

  return (
    <div>
      <WelcomeYummy />
      <Heading text={"кухни мира"} />
      <CenterMode />
      <Heading text={"рецепты"} />
      <RecipesMain isLoggedIn={modalIsLoggedIn} setIsLoggedIn={setModalIsLoggedIn} openModal={openHeaderModal}/>
      <Footer />
    </div>
  );
};

export default Main;