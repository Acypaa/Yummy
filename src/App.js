import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Publicates from './pages/Publicates/Publicates';
import Favorites from './pages/Favorites/Favorites';
import Friends from './pages/Friends/Friends';
import Profile from './pages/profile/Profile';
import AllRecipesNav from './components/AllRecipesNav';
import AllRecipes from './pages/allrecipes/AllRecipes';
import Recipe from './pages/recipe/Recipe';
import UserProfile from './components/UserProfile'; 
import UserPublicates from './components/UserPublicates';
import UserFriends from './components/UserFriends';
import UserFavorites from './components/UserFavorites';
import './styles/App.css'; 

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} /> 
                <Route path="/recipes" element={<AllRecipesNav />} /> 
                <Route path="/allrecipes" element={<AllRecipes />} /> 
                <Route path="/recipe/:id" element={<Recipe />} /> 
                <Route path="/publicates" element={<Publicates />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:username" element={<UserProfile />} /> 
                <Route path="/publicates/:username" element={<UserPublicates />} />
                <Route path="/friends/:username" element={<UserFriends />} />
                <Route path="/favorites/:username" element={<UserFavorites />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;