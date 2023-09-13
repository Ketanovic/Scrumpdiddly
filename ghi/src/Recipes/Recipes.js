import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "../Components/Search";
import { useGetAllRecipesQuery } from "../app/apiSlice";

export default function ListRecipes() {
  const searchCriteria = useSelector((state) => state.search.value);
  const { recipes, error, isLoading } = useGetAllRecipesQuery();
  console.log({ recipes, error, isLoading });

  if (isLoading) return <>Loading...</>

  // const [recipes, setRecipes] = useState([]);

  // const fetchRecipes = async () => {
  //   const url = `${process.env.REACT_APP_API_HOST}/api/recipes`;
  //   const response = await fetch(url);
  //   if (response.ok) {
  //     const json = await response.json();
  //     setRecipes(json.recipes);
  //   }
  // };

  const filteredRecipes = () => {
    if (searchCriteria)
      return recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchCriteria.toLowerCase())
      );
    return recipes;
  };

  // useEffect(() => {
  //   fetchRecipes();
  // }, []);

  return (
    <div className="page-wrap">
      <h1>
        Recipes for{" "}
        {searchCriteria && (
          <small className="text-body-secondary">"{searchCriteria}"</small>
        )}
      </h1>
      <Search />
      <div className="row pt-3 ease-up">
        {filteredRecipes().map((rec) => (
          <div className="col-4 pb-3 card-glow" key={rec.id}>
            <div className="small-card card-deck mb-3 text-center">
              <img src={rec.thumbnail} className="card-img-top" alt="..." />
              <div className="card-body d-flex flex-column">
                <div className="title-card">
                  <h5 className="card-title text-truncate">{rec.name}</h5>
                </div>
                <p className="card-text">
                  {rec.area} {rec.category}
                </p>
                <Link to={`/recipes/${encodeURIComponent(rec.id)}`}>
                  <button className="btn btn-block rec-button mt-auto">
                    Check it out!
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
