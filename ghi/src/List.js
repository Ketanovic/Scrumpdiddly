import ListRecipe from './Recipes.jsx';
import { useSelector } from "react-redux";
import { useGetAllRecipesQuery } from "./app/apiSlice";

const RecipeList = () => {
    const searchCriteria = useSelector(state => state.search.value)
    const { data, error, isLoading } = useGetAllRecipesQuery();
    console.log({data, error, isLoading}); //get rid of this when it works

    if (isLoading) return <>Loading...</>

    const filteredData = () => {
        if (searchCriteria) return data.recipe.filter(recipe => recipe.name.includes(searchCriteria))
        return data.recipe;
    }
    return (
        <>
            <h1>Recipes</h1>
            <div className="row mt-3">
                {data.map(p => <ListRecipe key={p.name} name={p.name} />)}
            </div>
        </>
    )
}

export default RecipeList;
