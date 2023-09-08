import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



export default function RecipeSearch() {
  const [pantry, setPantry] = useState([]);
  const [recList, setRecList] = useState([]);
  const [userId, setUserId] = useState("");
  const [recipeId, setRecipeId] = useState([]);

  const fetchUserData = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/token`, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setUserId(data.account.id);
    }
  };

  async function fetchPantry(userId) {
    fetchUserData();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/pantry_item/`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();

        const filteredData = data.pantry_items.filter(
          (item) => item.user_id === userId
        );
        setPantry(filteredData);
      } else {
        console.error("Failed to fetch pantry items");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  async function fetchPantryRecipes() {
    //create object to count ingredient counts
    const dict = {};
    for (let recipes of pantry) {
      for (let recipe of recipes.recipes) {
        if (dict[recipe] === undefined) {
          dict[recipe] = 0;
        }

        dict[recipe] += 1;
      }
    }
    //creates a list of recipe and number of times in pantry ingredients
    let recipeList = [];
    for (let key in dict) {
      let tempList = [];
      tempList.push(key);
      tempList.push(dict[key]);
      recipeList.push(tempList);
      tempList = [];
    }
    // sorts recipes by number of related ingredients
    recipeList.sort(function (a, b) {
      let x = a[1];
      let y = b[1];
      return y - x;
    });
    
    let tempList = recipeList.slice(0, 15);

    const url = `${process.env.REACT_APP_API_HOST}/api/recipes`;
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      setRecipeId(json.recipes);
      for (let pantryRecipe of tempList) {
        for (let recipe of json.recipes) {
          if (pantryRecipe[0] === recipe.name.toUpperCase()) {
            pantryRecipe.push(recipe.id);
          }
        }
      }
    }
    setRecList(tempList)
  }


  useEffect(() => {
    fetchPantryRecipes();
  }, [pantry]);
  useEffect(() => {
    fetchPantry(userId);
  }, [userId]);


  return (
    <div className="row page-wrap">
      <div className="row">
        <div className="mb-3 form-bg offset-3 col-6 py-3">
          <div className="mx-3">
            <h1 className="card-header mb-3 ">Recipes You Might Enjoy</h1>
            <div className="mb-3">
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
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Recipe Result</th>
                    <th>Number of overlapping ingredients</th>
                  </tr>
                </thead>
                <tbody>
                  {recList.map((recipe_item) => {
                    
                    return (
                      <tr key={recipe_item}>
                        <td>
                          <Link to={`/recipes/${recipe_item[2]}`}>
                            {recipe_item[0]}
                          </Link>
                        </td>
                        <td>{recipe_item[1]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
