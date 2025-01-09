import './styles/App.css';
import Main from "./pages/main/Main";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import React, {useContext} from 'react';
import AllRecipes from './pages/all_recipes/AllRecipes';
import Recipe from './pages/recipe/Recipe';
import { Context } from '.';
import AppRouter from './components/AppRouter';
import { observer } from 'mobx-react-lite';

const App = observer(() => {
  //const {user} = useContext(Context)
  return (
    <BrowserRouter className="App">
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;