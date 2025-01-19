import React, { createContext } from 'react';  
import ReactDOM from 'react-dom/client';  
import App from './App';  
import RecipeStore from './store/RecipeStore';  
import Modal from 'react-modal'; // Импортируем Modal  

export const Context = createContext(null);  

const root = ReactDOM.createRoot(document.getElementById('root'));  

// Устанавливаем элемент приложения для react-modal  
Modal.setAppElement('#root');  

root.render(  
  <React.StrictMode>  
    <Context.Provider value={{  
      recipe: new RecipeStore(),  
    }}>  
      <App />  
    </Context.Provider>  
  </React.StrictMode>  
);