import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/AllRecipesNav.css';

Modal.setAppElement('#root');

const AllRecipesNav = ({ addRecipe, handleSearch, onFilterChange, onApplyFilters, onClearFilters, selectedCuisine }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false); 
    const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
    const [newRecipe, setNewRecipe] = useState({
        id: 0,
        name: '',
        image: '',
        ingredients: '',
        steps: '',
        prepTimeHours: 0,
        prepTimeMinutes: 0,
        cookTimeHours: 0,
        cookTimeMinutes: 0,
        cuisine: '',
        servings: 1,
        dishType: ''
    });
    const [selectedDishType, setSelectedDishType] = useState(''); 

    const [recipes, setRecipes] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); 

    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setRecipes(storedRecipes); 
    }, []);

    const openAddRecipeModal = () => {
        if (!currentUser) {
            // Если пользователь не авторизован, перенаправляем на страницу входа
            alert('Вы должны быть авторизованы для добавления рецепта');
        } else {
            // Если авторизован, открываем модальное окно
            setModalIsOpen(true);
        }
    };

    const closeAddRecipeModal = () => {
        setModalIsOpen(false);
    };

    const openFilterModal = () => {
        setFilterModalIsOpen(true);
    };

    const closeFilterModal = () => {
        setFilterModalIsOpen(false);
    };

    const addNewRecipe = () => {
        const newRecipeWithId = {
            ...newRecipe,
            id: Date.now(),
            logo: newRecipe.logo || '',
            img: newRecipe.image || '',
            time: `${newRecipe.prepTimeHours} ч. ${newRecipe.prepTimeMinutes} мин`,
            timeOnKitchen: `${newRecipe.cookTimeHours} ч. ${newRecipe.cookTimeMinutes} мин`,
            country: newRecipe.cuisine || '',
            quantity: `${newRecipe.servings} порций`,
            author: currentUser ? currentUser.username : 'Не указан' 
        };

        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        storedRecipes.unshift(newRecipeWithId);
        localStorage.setItem('recipes', JSON.stringify(storedRecipes));

        addRecipe(newRecipeWithId);

        setNewRecipe({
            id: 0,
            name: '',
            image: '',
            ingredients: '',
            steps: '',
            prepTimeHours: 0,
            prepTimeMinutes: 0,
            cookTimeHours: 0,
            cookTimeMinutes: 0,
            cuisine: '',
            servings: 1,
            dishType: ''
        });

        closeAddRecipeModal();
    };

    const handleDelete = (id) => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        const updatedRecipes = storedRecipes.filter(recipe => recipe.id !== id || recipe.author); // Удаляем рецепт, если он без автора

        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        alert('Рецепт был успешно удален.');
    };

    const handleApplyFilters = () => {
        onApplyFilters(); 
        console.log('Фильтры применены');
        closeFilterModal();
    };
    
    const handleClearFilters = () => {
        console.log('Фильтры очищены');
        closeFilterModal();
    };
    const handleDishTypeChange = (type) => {
        setSelectedDishType(type); 
        onFilterChange(type, selectedCuisine); 
    };

    const handleCuisineChange = (event) => {
        const selectedCuisine = event.target.value;
        onFilterChange(selectedDishType, selectedCuisine); 
    };

    return (
        <div className='AllRecipesNav'>
            <div className="button-container">
                <button className='AllRecipesNav__btn' onClick={openFilterModal}>Фильтры</button>
                <button className='AllRecipesNav__btn' onClick={openAddRecipeModal}>Добавить</button>
                <div className="search-container">
                    <input 
                        type="text" 
                        placeholder='Поиск рецепта...' 
                        className='AllRecipesNav__input'
                        onChange={handleSearch} 
                    />
                </div>
            </div>
            {/* Модальное окно фильтров */}
            <Modal isOpen={filterModalIsOpen} onRequestClose={closeFilterModal}
                style={{
                    content: {
                        width: '699px',
                        height: 'auto',
                        margin: '0 auto',
                        marginTop: '140px',
                        borderRadius: '30px',
                        backgroundColor: 'rgba(239, 231, 221, 1)',
                        border: 'none',
                        boxShadow: '0px 4px 14px 0px rgba(0,0,0,0.25)'
                    },
                    overlay: {
                        backgroundColor: 'rgba(239, 231, 221, 0)',
                        backdropFilter: 'blur(0.7px)'
                    }
                }}
            >
                <h2 className='modal__top'>Фильтры</h2>
                <h3 className='modal__heading'>Тип блюда</h3>
                <div className="modal__btns">
                    {['Первые блюда', 'Вторые Блюда', 'Салаты', 'Закуски', 'Выпечка', 'Десерты', 'Напитки'].map((type) => (
                    <button 
                        key={type} 
                        className={`modal__btn ${selectedDishType === type ? 'active' : ''}`} 
                        onClick={() => handleDishTypeChange(type)}
                    >
                        {type}
                    </button>
                    ))}
                </div>
                <h3 className='modal__heading'>Кухня мира</h3>
                <select name="cuisine" id="country-select" className='modal__select'onChange={handleCuisineChange}>
                    <option value="">Выберите кухню</option>
                    <option value="Русская">Русская</option>
                    <option value="Французская">Французская</option>
                    <option value="Итальянская">Итальянская</option>
                    <option value="Грузинская">Грузинская</option>
                    <option value="Узбекская">Узбекская</option>
                    <option value="Корейская">Корейская</option>
                    <option value="Японская">Японская</option>
                    <option value="Китайская">Китайская</option>
                </select>

                <div className="modal__actions">
                    <button onClick={handleApplyFilters} className='modal__apply-btn'>Применить</button>
                    <button onClick={onClearFilters} className='modal__clear-btn'>Очистить</button>
                </div>

                <button onClick={closeFilterModal} className='modal__close-btn'></button>
            </Modal>

            {/* Модальное окно добавления рецепта */}
            <Modal isOpen={modalIsOpen} onRequestClose={closeAddRecipeModal}
                style={{
                    content: {
                        width: '699px',
                        height: 'auto',
                        margin: '0 auto',
                        marginTop: '140px',
                        borderRadius: '30px',
                        backgroundColor: 'rgba(239, 231, 221, 1)',
                        border: 'none',
                        boxShadow: '0px 4px 14px 0px rgba(0,0,0,0.25)'
                    },
                    overlay: {
                        backgroundColor: 'rgba(239, 231, 221, 0)',
                        backdropFilter: 'blur(0.7px)'
                    }
                }}
            >
                <div className="modal__content">
                    <h2 className='modal__top'>Добавить рецепт</h2>
                    <input 
                        type="text" 
                        placeholder="Название блюда" 
                        value={newRecipe.name}
                        onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
                        className="modal__input"
                    />
                    <input 
                        type="text" 
                        placeholder="Имя автора" 
                        value={currentUser ? currentUser.username : ''} 
                        readOnly
                    />
                    <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const reader = new FileReader();

                                reader.onloadend = () => {
                                    // Сохраняем Base64 строку в состоянии
                                    setNewRecipe({ ...newRecipe, image: reader.result });
                                };

                                // Читаем файл как Data URL
                                reader.readAsDataURL(file);
                            }
                        }}                     />
                    <textarea 
                        placeholder="Ингредиенты" 
                        onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} 
                        rows="4" 
                    />
                    <textarea 
                        placeholder="Шаги" 
                        onChange={(e) => setNewRecipe({ ...newRecipe, steps: e.target.value })} 
                        rows="4" 
                    />
                    <div>
                        <input 
                            type="number" 
                            min="0" 
                            placeholder="Часы приготовления" 
                            onChange={(e) => setNewRecipe({ ...newRecipe, prepTimeHours: e.target.value })} 
                        />
                        <span>часы</span>
                        <input 
                            type="number" 
                            min="0" 
                            placeholder="Минуты приготовления" 
                            onChange={(e) => setNewRecipe({ ...newRecipe, prepTimeMinutes: e.target.value })} 
                        />
                        <span>минуты</span>
                    </div>
                    <div>
                        <input 
                            type="number" 
                            min="0" 
                            placeholder="Часы на кухне" 
                            onChange={(e) => setNewRecipe({ ...newRecipe, cookTimeHours: e.target.value })} 
                        />
                        <span>часы</span>
                        <input 
                            type="number" 
                            min="0" 
                            placeholder="Минуты на кухне" 
                            onChange={(e) => setNewRecipe({ ...newRecipe, cookTimeMinutes: e.target.value })} 
                        />
                        <span>минуты</span>
                    </div>
                    <select 
                        name="cuisine" 
                        onChange={(e) => setNewRecipe({ ...newRecipe, cuisine: e.target.value })}
                    >
                        <option value="">Выберите кухню</option>
                        <option value="Русская">Русская</option>
                        <option value="Французская">Французская</option>
                        <option value="Итальянская">Итальянская</option>
                        <option value="Грузинская">Грузинская</option>
                        <option value="Узбекская">Узбекская</option>
                        <option value="Корейская">Корейская</option>
                        <option value="Японская">Японская</option>
                        <option value="Китайская">Китайская</option>
                    </select>
                    <select 
                        name="dishType" 
                        onChange={(e) => setNewRecipe({ ...newRecipe, dishType: e.target.value })} // Добавляем выбор типа блюда
                    >
                        <option value="">Выберите тип блюда</option>
                        <option value="Первые блюда">Первые блюда</option>
                        <option value="Вторые блюда">Вторые блюда</option>
                        <option value="Салаты">Салаты</option>
                        <option value="Закуски">Закуски</option>
                        <option value="Выпечка">Выпечка</option>
                        <option value="Десерты">Десерты</option>
                        <option value="Напитки">Напитки</option>
                    </select>
                    <input 
                        type="number" 
                        min="1" 
                        placeholder="Количество порций" 
                        onChange={(e) => setNewRecipe({ ...newRecipe, quantity: e.target.value })} 
                    />
                    <button onClick={addNewRecipe}>Сохранить</button>
                    <button onClick={closeAddRecipeModal} className='modal__close-btn'></button>
                </div>
            </Modal>
        </div>
    );
};

export default AllRecipesNav;
