// import React, {useContext} from 'react';
// import AllRecipesCard from './AllRecipesCard';
// import {Context} from '../index';
// import {observer} from "mobx-react-lite";
// import '../styles/RecipeList.css'


// const RecipeList = observer(() => {
//   const {recipe} = useContext(Context);


//   return (
//     <div className='RecipeList'>
//       {recipe.recipes.map(recipe =>
//           <AllRecipesCard key={recipe.id} recipe={recipe} />
//       )}
//     </div>
//   );
// });

// export default RecipeList;
import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { observer } from "mobx-react-lite";
import AllRecipesCard from './AllRecipesCard';
import '../styles/RecipeList.css';

const RecipeList = observer(() => {
  const { recipe } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1); // Текущая страница
  const recipesPerPage = 9; // Количество рецептов на странице

  // Вычисляем индексы для текущей страницы
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipe.recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Функция для изменения страницы
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='RecipeList'>
      {/* Отображение рецептов для текущей страницы */}
      {currentRecipes.map(recipe => (
        <AllRecipesCard key={recipe.id} recipe={recipe} />
      ))}

      {/* Пагинация */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(recipe.recipes.length / recipesPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
});

export default RecipeList;