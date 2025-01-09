import React, { useContext, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import '../../styles/AllRecipes.css';
import AllRecipesNav from '../../components/AllRecipesNav';
import AllRecipesCard from '../../components/AllRecipesCard';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import RecipeList from '../../components/RecipeList';
//import {fetchRecipes} from "../../http/recipeAPI";


const AllRecipes = observer(() => {
//  const {recipe} = useContext(Context);
//  useEffect(() => {
//    fetchRecipes().then(data => {
//        recipe.setRecipes(data.rows)
//    })
//}, [])


  return (
    <div className='AllRecipes'>
      <Header />
      <h1 className='AllRecipes__title'>Рецепты</h1>
      <AllRecipesNav />
      <div className="AllRecipesCards">
        <RecipeList />
      </div>
      <Footer />
    </div>
  );
});

export default AllRecipes;