import React, { useState, useEffect } from "react";

function PantryForm() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [filter, setFilter] = useState([]);
  const [searchIngredient, setSearchIngredient] = useState("");
  const [pantry, setPantry] = useState([]);
  const [recipe, setRecipe] = useState([]);

  async function fetchIngredients() {
    const response = await fetch("http://localhost:8000/api/ingredients/");
    if (response.ok) {
      const data = await response.json();

      setIngredients(Object.values(data.ingredients));
      setFilter(Object.values(data.ingredients));
    }
  }
  async function fetchPantry() {
    const response = await fetch("http://localhost:8000/api/pantry_item/");
    if (response.ok) {
      const data = await response.json();
      setPantry(Object.values(data.pantry_items));
    }
  }

  const handleSearch = async () => {
    const result = ingredients.filter((ingredients) =>
      ingredients.name.includes(searchIngredient.toUpperCase())
    );
    setFilter(result);
  };

  const handleSubmit = async (event) => {
    const value = event.target.value;
    const value2 = value.split(",");
    const x = value2.shift();
    setName(x);
    setRecipe(value2);
    const data = {};
    data.name = x;
    data.recipes = value2;
    console.log(data);
    const url = "http://localhost:8000/api/pantry_item/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setName("");
      window.location.reload();
    } else {
      console.error(response);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    fetchPantry();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Pantry Item</h1>
          <div className="grid"></div>
          <form
            onSubmit={handleSubmit}
            id="create-ingredient-form"
            placeholder="Name of Pantry"
          >
            <div className="grid">
              <label htmlFor="name">Search Ingredients</label>
              <div>
                <input
                  type="text"
                  placeholder="Start typing what you have in your pantry"
                  value={searchIngredient}
                  onChange={(e) => setSearchIngredient(e.target.value)}
                  className="form-control"
                />
                <div>
                  <button
                    onClick={handleSearch}
                    type="button"
                    className="btn btn-primary btn-sm"
                  >
                    Search Ingredients
                  </button>
                </div>
              </div>
            </div>

            <div className="dropdown">
              <select
                onChange={handleSubmit}
                value={ingredient}
                name="ingredients"
                id="ingredients"
                className="dropdown"
              >
                <option value="">Choose an ingredient</option>
                {filter.map((ingredient) => {
                  return (
                    <option
                      value={[ingredient.name, ingredient.recipe]}
                      key={ingredient.name}
                    >
                      {ingredient.name}
                    </option>
                  );
                })}
              </select>
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Items in Pantry</th>
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
            <button className="btn btn-primary">See what's for dinner!</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PantryForm;
