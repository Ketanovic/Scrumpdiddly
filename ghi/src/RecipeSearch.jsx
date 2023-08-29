import React, { useState, useEffect } from "react";

function RecipeSearch() {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [pantry, setPantry] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [dict2, setDict2] = useState({});

    async function fetchPantry() {
    const response = await fetch("http://localhost:8000/api/pantry_item/");
    if (response.ok) {
      const data = await response.json();
      setPantry(Object.values(data.pantry_items));
    }
  }
    async function fetchPantryRecipes() {
    const response = await fetch("http://localhost:8000/api/pantry_item/");
    if (response.ok) {
    const dict = {};
      const data = await response.json();
      const pantryDict = Object.values(data.pantry_items);
      for (let recipes of pantryDict) {
        for (let recipe of recipes.recipes) {
            if (dict[recipe] === undefined) {
                dict[recipe] = 0
            }
            console.log(recipe)
            dict[recipe] += 1
            console.log(dict)
        }
      }
      setRecipe(Object.keys(dict));
      setDict2(dict)
    }
  }

  useEffect(() => {
    fetchPantry();
    fetchPantryRecipes();
  }, []);

   return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Recipes you might enjoy</h1>
            <div className="mb-3">
              {/* <label htmlFor="name">Ingredients List in Pantry</label> */}
              <table>
                <thead>
                  <tr>
                    <th>With these ingredients below....</th>
                  </tr>
                </thead>
                <tbody>
                  {pantry.map((pantry_item) => {
                    return (
                      <tr key={pantry_item.name}>
                        <td>{pantry_item.name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <h4>You can make these for dinner!:</h4>
            </div>
            <div className="mb-3">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Recipe Result</th>
                    <th>Number of overlapping ingredients</th>
                  </tr>
                </thead>
                <tbody>
                  {recipe.map((recipe_item) => {
                    console.log("************", recipe_item)
                    return (
                      <tr key={recipe_item}>
                        <td>{recipe_item}</td>
                        <td>{dict2[recipe_item]}</td>
                      </tr>
                    );
                  })}
                  {/* {for (let recipe_item of recipe){
                    console.log({recipe_item})
                  }
                } */}

                </tbody>
              </table>
            </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeSearch;
