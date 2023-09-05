import React, { useState, useEffect } from 'react';

function RecipeDetailPage() {
  const [recipe, setRecipe] = useState([]);

  const fetchSingleRecipe = async () => {
    const url = "http://localhost:8000/api/recipes/64f0e25b7febf823138e36c6";
    const response = await fetch(url);
    console.log("AHAHAHAHAHAHA", response)
    if (response.ok) {
      const json = await response.json();
      setRecipe(json);


    }
  };

  useEffect(() => {
      fetchSingleRecipe();
  }, []);

  return (
    <div>
      <h1>{recipe.name}</h1>
      <p>Category: {recipe.category}</p>
      <p>Area: {recipe.area}</p>
      <p>Instructions: {recipe.instructions}</p>
      {/* <table>
        <tbody>
          {recipe.ingredients.map((ingnames) => {
            return (
              <tr key = {ingnames}>
                <td>{ingnames}</td>
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <p></p>
      {/* <p>Ingredients: {recipe.ingredients.ingredients}</p>
      <table className= "table table-striped">
        {recipe.map((rec)) => {
          return (
            <tr key={rec.ingredients}>
              <td>{rec.ingredients}</td>
            </tr>
          )
          <tbody>
            {% for key, value in ingredients.items() %}
              <tr>
                  <td> {{ key }} </td>
                  <td> {{ value }} </td>
              </tr>
            {% endfor %}
        </tbody>
      </table> */}
    </div>
  );
}

export default RecipeDetailPage;
