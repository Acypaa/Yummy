import React, { createContext } from 'react';  
import RecipeStore from './RecipeStore';  

const RecipeContext = createContext(null);  

export const RecipeProvider = ({ children }) => {  
    const recipeStore = new RecipeStore();  
    return (  
        <RecipeContext.Provider value={recipeStore}>  
            {children}  
        </RecipeContext.Provider>  
    );  
};  

export const useRecipeStore = () => React.useContext(RecipeContext);