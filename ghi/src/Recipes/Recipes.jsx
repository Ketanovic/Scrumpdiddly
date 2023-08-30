import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAllRecipesQuery } from "../app/apiSlice";

export default function ListRecipes() {
  const [recipes, setRecipes] = useState([]);
  const searchCriteria = useSelector((state) => state.search.value);
  const { data, error, isLoading } = useGetAllRecipesQuery();
  console.log({ data, error, isLoading }); //get rid of this when it works

  // if (isLoading) return <>Loading...</>;

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

  const filteredData = () => {
    if (searchCriteria)
      return recipes.filter((recipe) => recipe.name.includes(searchCriteria));
    return recipes;
  };

  return (
    <div>
      <h1 className="mt-3">
        Recipes{" "}
        {searchCriteria && (
          <small className="text-body-secondary">"{searchCriteria}</small>
        )}
      </h1>
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
          {filteredData.recipes.map((rec) => {
            console.log(
              "aaaaaaaaaaaaaaaaaaaaaa",
              rec,
              rec.ingredients["ingredients"]
            );
            return (
              <tr key={rec.name}>
                <td>{rec.name}</td>
                <td>{rec.category}</td>
                <td>{rec.area}</td>
                <td>{rec.instructions}</td>
                <td>{rec.ingredients.ingredients}</td>
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
