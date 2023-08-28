import React, { useState, useEffect } from "react";

function RecipeSearch() {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [pantry, setPantry] = useState([]);
    const [recipe, setRecipe] = useState([]);
    const [dict2, setDict2] = useState({});
    const [recList, setRecList] = useState([]);

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
            
            dict[recipe] += 1
            
        }
      
      }
      let recipeList = [];
      for (let key in dict) {
        let tempList = [];
        tempList.push(key);
        tempList.push(dict[key]);
        recipeList.push(tempList);
        tempList = [];
      }
    recipeList.sort(function(a,b){
        let x = a[1]
        let y = b[1]
        return y - x
      })
    console.log("recipe list sorted*******", recipeList);
      setRecipe(Object.keys(dict));
      setDict2(dict)
      setRecList(recipeList.slice(0,10))
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
                 {recList.map((recipe_item) => {
                   return (
                     <tr key={recipe_item}>
                       <td>{recipe_item[0]}</td>
                       <td>{recipe_item[1]}</td>
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
