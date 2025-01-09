import React, {useContext} from 'react';
import AllRecipesCard from './AllRecipesCard';
import {Context} from '../index';
import {observer} from "mobx-react-lite";
import '../styles/RecipeList.css'


const RecipeList = observer(() => {
  const {recipe} = useContext(Context);


  return (
    <div className='RecipeList'>
      {recipe.recipes.map(recipe =>
          <AllRecipesCard key={recipe.id} recipe={recipe} />
      )}
    </div>
  );
});

export default RecipeList;