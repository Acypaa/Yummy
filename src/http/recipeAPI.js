import {$host} from "./index";

//export const fetchRecipes = async (img, name) => {
//    const {data} = await $host.get('api/recipe', {params: {
//            img, name
//        }})
//    return data
//}

export const fetchOneRecipe = async (id) => {
    const {data} = await $host.get('api/recipe/' + id)
    return data
}