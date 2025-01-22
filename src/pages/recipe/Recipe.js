import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../styles/Recipe.css';
import Footer from '../../components/Footer';

const Recipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Найти рецепт по ID
    const recipe = recipes.find(r => r.id === parseInt(id));

    const [isFavorite, setIsFavorite] = useState(false);

    // Если рецепт не найден, показываем сообщение
    if (!recipe) {
        return <div>Рецепт не найден</div>;
    }

    // Получаем текущего пользователя
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Проверка избранного при рендере
    const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
    const userFavorites = favorites[currentUser?.username] || [];
    const isAlreadyFavorite = userFavorites.some(fav => fav.recipeId === recipe.id);

    // Обновляем состояние избранного синхронно при первом рендере
    if (isFavorite !== isAlreadyFavorite) {
        setIsFavorite(isAlreadyFavorite);
    }

    const handleDelete = (id) => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const recipeToDelete = storedRecipes.find(recipe => recipe.id === id);
        const currentUser = JSON.parse(localStorage.getItem('currentUser')); 

        if (recipeToDelete && recipeToDelete.author !== currentUser.username) {
            alert('Вы не можете удалить этот рецепт, так как вы не являетесь его автором.');
            return; 
        }

        const updatedRecipes = storedRecipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        alert('Рецепт был успешно удален.');
        navigate('/allrecipes'); 
    };

    const handleShare = () => {
        const shareUrl = window.location.href; // Получаем текущий URL страницы
        navigator.clipboard.writeText(shareUrl) // Копируем URL в буфер обмена
            .then(() => {
                alert('Ссылка скопирована в буфер обмена!');
            })
            .catch(err => {
                console.error('Ошибка при копировании: ', err);
            });
    };

    const handleAddToFavorites = () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const recipeInFavorites = favorites.find(fav => fav.id === recipe.id);
        if (recipe.author === currentUser.username) {
            alert('Вы не можете добавить свой рецепт в избранное.');
            return;
        }
        if (!recipeInFavorites) {
            favorites.push({ ...recipe, username: JSON.parse(localStorage.getItem('currentUser')).username });
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert('Рецепт добавлен в избранное!');
        } else {
            const updatedFavorites = favorites.filter(fav => fav.id !== recipe.id);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            alert('Рецепт удален из избранного!');
        }
    
        console.log(favorites); // Выводим все избранные рецепты после добавления/удаления
    };

    return (
        <div className='Recipe'>
            <h1 className='Recipe__title'>{recipe.name}</h1>
            <div className="Recipe__top">
                <img src={recipe.img} alt="" className='Recipe__top-img' />
                <div className="top__right">
                    <div className='top__right-author'>
                        Автор: <Link to={`/profile/${recipe.author}`}>{recipe.author}</Link>
                    </div>
                    <button 
                        className='top__right-btn' 
                        onClick={handleAddToFavorites}
                    >
                        {isFavorite ? 'Удалить из избранного' : 'В избранное'}
                        <img src="../img/Recipe/fav.png" alt="" />
                    </button>
                    <button className='top__right-btn' onClick={handleShare}>Поделиться <img src="../img/Recipe/repost.png" alt="" /></button>
                    {/* <button className='top__right-btn'>Комментарии <img src="../img/Recipe/comment.png" alt="" /></button> */}
                    <button className='top__right-btn' onClick={() => handleDelete(recipe.id)}>Удалить</button> 
                </div> 
            </div>
            <div className="Recipe__about">
                <div className="about__top">
                    <div className="all-time">
                        <div className="about__title">Время приготовления</div>
                        <div className="about-info">
                            <img src="../img/Recipe/all-time.png" alt="" />
                            <div className="about-info__text">{recipe.time}</div>
                        </div>
                    </div>
                    <div className="time-on-kitchen">
                        <div className="about__title">Время на кухне</div>
                        <div className="about-info">
                            <img src="../img/Recipe/time-on-kitchen.png" alt="" />
                            <div className="about-info__text">{recipe.timeOnKitchen}</div>
                        </div>
                    </div>
                </div>
                <div className="about__bottom">
                    <div className="kitchen">
                        <div className="about__title">Кухня</div>
                        <div className="about-info">
                            <img src="../img/Recipe/flag.png" alt="" />
                            <div className="about-info__text">{recipe.country}</div>
                        </div>
                    </div>
                    <div className="slices">
                        <div className="about__title">Количество порций</div>
                        <div className="about-info">
                            <img src="../img/Recipe/slices.png" alt="" />
                            <div className="about-info__text">{recipe.quantity}</div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 style={{ textAlign: 'center' }}>Ингредиенты</h2>
            <div className="ingredients ingredients-text">
                {recipe.ingredients.split('\n').map((ingredient, index) => (
                    <div key={index}>{ingredient.trim()}</div>
                ))}
            </div>
            <h2 style={{ textAlign: 'center' }}>Шаги</h2>
            <div className="Recipe__steps">
                {recipe.steps.split('\n').map((step, index) => (
                    <div key={index}>{step.trim()}</div>
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default Recipe;