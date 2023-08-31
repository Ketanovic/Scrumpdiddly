// import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAllRecipesQuery } from "../app/apiSlice";

const ListRecipes = () => {
  const searchCriteria = useSelector((state) => state.search.value);
  const { data, error, isLoading } = useGetAllRecipesQuery();
  console.log({ data, error, isLoading }); //get rid of this when it works

  if (isLoading) return <>Loading...</>;

  const filteredData = () => {
    if (searchCriteria)
      return data.recipes.filter((recipe) =>
        recipe.name.includes(searchCriteria)
      );
    return data.recipes;
  };

  return (
    <div>
      <h1 className="mt-3">
        Recipes {""}
        {searchCriteria && (
          <small className="text-body-secondary">'{searchCriteria}'</small>
        )}
      </h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Area</th>
            {/* <th>Instructions</th> */}
            <th>ingredients</th>
          </tr>
        </thead>
        <tbody>
          {filteredData().map((rec) => {
            console.log("aaaaaaaaaaaaaaaaaaaaaa", rec);
            return (
              <tr key={rec.name}>
                <td>{rec.name}</td>
                <td>{rec.category}</td>
                <td>{rec.area}</td>
                {/* <td>{rec.instructions}</td> */}
                <td>{rec.ingredients.ingredients}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ListRecipes;
