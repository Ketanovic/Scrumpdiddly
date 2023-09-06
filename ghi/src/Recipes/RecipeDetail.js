import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetailPage() {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const {recipeid}  = useParams();
  console.log("wwwwwwwwwwwwwwwwwwwwwwwwww", recipeid)

  const fetchSingleRecipe = async () => {
    const url = `http://localhost:8000/api/recipes/${recipeid}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setRecipe(data);
      let ingredientList = [];
      for (let key in data.ingredients) {
        let tempList = [];
        tempList.push(key);
        tempList.push(data.ingredients[key]);
        ingredientList.push(tempList);
        tempList = [];
      }
      setIngredients(ingredientList)
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
      <table>
        <tbody>
          {ingredients.map((ingnames) => {
            return (
              <tr key = {ingnames}>
                <td>{ingnames}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
