import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function ListRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [searchRecipe, setSearchRecipe] = useState("");
  const [displayedRecipes, setDisplayedRecipes] = useState([]);

  const fetchRecipes = async () => {
    const url = "http://localhost:8000/api/recipes";
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      setRecipes(json.recipes);
      setDisplayedRecipes(json.recipes);
    }
  }

  const handleSearch = () => {
    const filteredRecipes = recipes.filter(rec => rec.name.toLowerCase().includes(searchRecipe.toLowerCase()));
    setDisplayedRecipes(filteredRecipes);
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="page-wrap">
      <form
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
        className="form-inline my-2 my-lg-0"
      >
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder="Search your favorite dish"
          value={searchRecipe}
          onChange={(e) => setSearchRecipe(e.target.value)}
          aria-label="Search"
        />
        <button
          onClick={handleSearch}
          className="button my-2 my-sm-0"
          type="button"
        >
          Search Recipe!
        </button>
      </form>
      <div className="row pt-3 ease-up">
        {displayedRecipes.map((rec) => ( // <<< Make sure you use displayedRecipes here
          <div className="col-4 pb-3 card-glow" key={rec.id}>
            <div className="small-card card-deck mb-3 text-center">
              <img src={rec.thumbnail} className="card-img-top" alt="..." />
              <div className="card-body d-flex flex-column">
                <div className="title-card">
                  <h5 className="card-title text-truncate">{rec.name}</h5>
                </div>
                <p className="card-text">{rec.area} {rec.category}</p>
                <Link to={`/recipes/${encodeURIComponent(rec.id)}`}>
                  <button className="btn btn-block rec-button mt-auto">Check it out!</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
