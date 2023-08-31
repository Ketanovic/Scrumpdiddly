import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetailPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v2/9973533/lookup.php?i=${recipeId}`)
      .then(response => response.json())
      .then(data => setRecipe(data.meals[0]))
      .catch(error => console.error('Error fetching recipe:', error));
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(recipe[`strIngredient${i}`]);
    }
  }

  return (
    <div>
      <h1>{recipe.strMeal}</h1>
      <p>Category: {recipe.strCategory}</p>
      <p>Area: {recipe.strArea}</p>
      <p>Instructions: {recipe.strInstructions}</p>
      <p>Ingredients: {ingredients.join(', ')}</p>
    </div>
  );
}

export default RecipeDetailPage;
