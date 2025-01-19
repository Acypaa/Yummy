import {RECIPE_ROUTE, ALLRECIPES_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, FRIENDS_ROUTE, FAVORITES_ROUTE, PUBLICATES_ROUTE} from "./utils/consts";
import AllRecipes from "./pages/all_recipes/AllRecipes";
import Recipe from "./pages/recipe/Recipe";
import Main from "./pages/main/Main";
import Profile from "./pages/profile/Profile";
import Friends from "./pages/Friends/Friends";
import Favorites from "./pages/Favorites/Favorites";
import Publicates from "./pages/Publicates/Publicates";

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <Main />
    },
    {
        path: ALLRECIPES_ROUTE,
        Component: <AllRecipes />
    },
    {
        path: RECIPE_ROUTE + '/:id',
        Component: <Recipe />
    },
    {
      path: PROFILE_ROUTE,
      Component: <Profile />
    },
    {
      path: FRIENDS_ROUTE,
      Component: <Friends />
    },
    {
      path: FAVORITES_ROUTE,
      Component: <Favorites />
    },
    {
      path: PUBLICATES_ROUTE,
      Component: <Publicates />
    }
]