import React, { useState, useEffect, useMemo } from 'react';
import '../../styles/AllRecipes.css';
import AllRecipesNav from '../../components/AllRecipesNav';  
import AllRecipesCard from '../../components/AllRecipesCard';  
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 


const AllRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [tempFilters, setTempFilters] = useState([]);
    const [tempCuisine, setTempCuisine] = useState('');

    useEffect(() => {
        console.log("Компонент AllRecipes загружен");
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setRecipes(storedRecipes);
    }, []);

    const handleFilterChange = (filters, cuisine) => {
        setTempFilters(filters);
        setTempCuisine(cuisine);
    };

    const applyFilters = () => {
        setSelectedFilters(tempFilters);
        setSelectedCuisine(tempCuisine);
    };
    const clearFilters = () => {
        setSelectedFilters([]); 
        setSelectedCuisine(''); 
        setTempFilters([]); 
        setTempCuisine(''); 
    };

    const addRecipe = (newRecipe) => {
        const updatedRecipes = [newRecipe, ...recipes]; 
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value); 
    };

    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => {
            const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilters = !selectedFilters.length || recipe.dishType === selectedFilters; // Проверяем выбранный тип блюда
            const matchesCuisine = !selectedCuisine || recipe.cuisine === selectedCuisine; // Фильтрация по кухне
            return matchesSearch && matchesFilters && matchesCuisine;
        });
    }, [recipes, searchTerm, selectedFilters, selectedCuisine]);

    return (
        <div className="all-recipes-container">
            <Header /> 
            <AllRecipesNav 
                addRecipe={addRecipe} 
                handleSearch={handleSearch} 
                onFilterChange={handleFilterChange} 
                onApplyFilters={applyFilters} 
                onClearFilters={clearFilters}
                selectedCuisine={selectedCuisine} 
/>
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