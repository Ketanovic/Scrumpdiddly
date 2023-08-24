import React, { useState, useEffect } from "react";

function PantryForm() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  //   const [ingredientss, setIngredientss] = useState("");
  const [filter, setFilter] = useState([]);
  const [searchIngredient, setSearchIngredient] = useState("");
  const [pantry, setPantry] = useState([]);
  const [recipe, setRecipe] = useState([])

  const handleChange = (event) => {
    const value = event.target.value;
    const value2 = value.split(",")
    const x = value2.shift()
    console.log("************",x)
    console.log("************", value2);
    setName(x);
    setRecipe(value2)
  };

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
      ingredients.name.startsWith(searchIngredient.toUpperCase())
    );
    setFilter(result);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.name = name;
    data.recipes = recipe
    // data.recipes = recipes
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
      //setIngredients('');
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
          <form onSubmit={handleSubmit} id="create-ingredient-form">
            <div className="mb-3">
              <label htmlFor="name">Pantry Item</label>
              <input
                required
                onChange={handleChange}
                value={name}
                name="name"
                id="name"
                type="text"
                className="form-control"
              />
            </div>
            <div className="input-group mb-2">
              <input
                type="text"
                value={searchIngredient}
                onChange={(e) => setSearchIngredient(e.target.value)}
              />
              <button
                onClick={handleSearch}
                type="button"
                className="btn btn-outline-secondary"
              >
                Search Ingredients
              </button>
            </div>
            <h1>What Ingredients Do You Have?</h1>
            <div className="mb-3">
              <label htmlFor="name">Ingredients</label>
              <select
                onChange={handleChange}
                value={ingredient}
                name="ingredients"
                id="ingredients"
                className="form-select"
              >
                <option value="">Choose an ingredient</option>
                {filter.map((ingredient) => {
                  return (
                    <option value={[ingredient.name, ingredient.recipe]} key={ingredient.name}>
                      {ingredient.name}
                    </option>
                  );
                })}
              </select>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
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
            <button className="btn btn-primary">Create</button>
            <h1>Input Ingredients you have at Home!</h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PantryForm;
