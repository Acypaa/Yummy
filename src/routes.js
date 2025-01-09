import {RECIPE_ROUTE, ALLRECIPES_ROUTE, MAIN_ROUTE, PROFILE_ROUTE, FRIENDS_ROUTE} from "./utils/consts";
import AllRecipes from "./pages/all_recipes/AllRecipes";
import Recipe from "./pages/recipe/Recipe";
import Main from "./pages/main/Main";
import Profile from "./pages/profile/Profile";
import Friends from "./pages/Friends/Friends";

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
    }
]