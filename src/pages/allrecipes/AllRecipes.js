import React, { useState, useEffect } from 'react';
import '../../styles/AllRecipes.css';
import AllRecipesNav from '../../components/AllRecipesNav';  
import AllRecipesCard from '../../components/AllRecipesCard';  
import RecipeStore from '../../store/RecipeStore';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 

const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Состояние для хранения поискового запроса
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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value); // Обновляем состояние поискового запроса
    };

    // Фильтруем рецепты на основе поискового запроса
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="all-recipes-container">
            <Header /> 
            <AllRecipesNav addRecipe={addRecipe} handleSearch={handleSearch} /> {/* Передаем handleSearch в AllRecipesNav */}
            <h1>Все Рецепты</h1>
            <div className="all-recipes">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map(recipe => (
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