import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetailPage() {
  const { recipeName } = useParams();
  const [recipe, setRecipe] = useState([]);

  const fetchRecipe = async () => {
    const url = "http://localhost:8000/api/recipes/";
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      setRecipe(json.recipe);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  // useEffect(() => {
  //   fetch(`http://localhost:8000/api/recipes/${encodeURIComponent(recipeName)}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.recipes && data.recipes.length > 0) {
  //         setRecipe(data.recipes[0]);
  //       } else {
  //         setError(true);
  //       }
  //     })
  //     .catch(error => {
  //       console.error('Error fetching recipe:', error);
  //       setError(true);
  //     });
  // }, [recipeName]);

  // if (!recipe) {
  //   return <div>Loading...</div>;
  // }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(recipe[`strIngredient${i}`]);
    }
  }

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>Category: {recipe.category}</p>
      <p>Area: {recipe.area}</p>
      <p>Instructions: {recipe.instructions}</p>
      <p>Ingredients: {ingredients.join(', ')}</p>
    </div>
  );
}

export default RecipeDetailPage;
