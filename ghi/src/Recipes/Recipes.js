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

  return (
    <div className="page-wrap not-main">
      <div className="row pt-3 ease-up">
            {recipes.map((rec) => { 
                return (
                    <div className="col-4 pb-3 card-glow">
                      <div className="smaA9B7 ll-card card-deck mb-3 text-center">
                        <img src={rec.thumbnail} class="card-img-top" alt="..."/>
                        <div className="card-body d-flex flex-column">
                          <div className="title-card">
                            <h5 className="card-title text-truncate">{rec.name}</h5>
                          </div>
                          <p className="card-text">{rec.area} {rec.category}</p>
                          <button className="btn btn-block rec-button mt-auto">Check it out!</button>
                        </div>
                      </div>
                    </div>
                );
              })}
      </div>
    </div>
  );
}
