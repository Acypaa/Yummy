import React, { useState, useEffect } from 'react';
import '../../styles/AllRecipes.css';
import AllRecipesNav from '../../components/AllRecipesNav';  
import AllRecipesCard from '../../components/AllRecipesCard';  
import RecipeStore from '../../store/RecipeStore';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const store = new RecipeStore();
    useEffect(() => {
        console.log("Компонент AllRecipes загружен");
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setRecipes(storedRecipes);
    }, []);

    const addRecipe = (newRecipe) => {
        const updatedRecipes = [newRecipe, ...recipes]; // Добавляем новый рецепт в начало массива
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    return (
        <div className="all-recipes-container">
            <Header /> 
            <AllRecipesNav addRecipe={addRecipe} />
            <h1>Все Рецепты</h1>
            <div className="all-recipes">
                {recipes.length > 0 ? (
                    recipes.map(recipe => (
                        <AllRecipesCard key={recipe.id} recipe={recipe} />
                    ))
                ) : (
                    <p>Нет доступных рецептов.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default AllRecipes;