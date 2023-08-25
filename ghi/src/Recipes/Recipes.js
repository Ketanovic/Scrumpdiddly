import React, { useState, useEffect } from "react";

export default function ListRecipes() {
  const [recipes, setRecipes] = useState([]);


  const fetchRecipes = async () => {
    const url = "http://localhost:8000/api/recipes";
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      setRecipes(json.recipes);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  console.log("aaaaaaaaaaaaaaaaaaaaaadsfdsafasdfdsadfas", recipes)
  return (
    <div>
      <h1>Recipes</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Area</th>
            <th>Instructions</th>
            <th>ingredients</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((rec) => {
              return (
                <tr key={rec.id}>
                  <td>{rec.name}</td>
                  <td>{rec.category}</td>
                  <td>{rec.area}</td>
                  <td>{rec.instructions}</td>
                  <td>{rec.ingredients}</td>
                  {/* <td>{rec.technician.first_name}</td> */}
                  <td>
                    {/* <FinishAppointmentButton id={rec.id} />
                    <CancelAppointmentButton id={rec.id} /> */}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
