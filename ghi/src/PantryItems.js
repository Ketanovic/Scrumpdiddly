import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function PantryForm() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [filter, setFilter] = useState([]);
  const [searchIngredient, setSearchIngredient] = useState("");
  const [pantry, setPantry] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const { token } = useAuthContext();
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  async function fetchIngredients() {
    const response = await fetch("http://localhost:8000/api/ingredients/");
    if (response.ok) {
      const data = await response.json();
      setIngredients(Object.values(data.ingredients));
      setFilter(Object.values(data.ingredients));
    }
  }

  const fetchUserData = async () => {
    const response = await fetch("http://localhost:8000/token", {
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
      const response = await fetch("http://localhost:8000/api/pantry_item/", {
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
    const data = {
      name: x,
      recipes: value2,
      user_id: userId,
    };
    const url = "http://localhost:8000/api/pantry_item/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setName("");
      const newPantry = [...pantry];
      newPantry.push(data);
      setPantry(newPantry);
    } else {
      console.error(response);
    }
  };

  const handleDelete = async (_id) => {
    const url = `http://localhost:8000/api/pantry_item/${_id}`;
    const fetchConfig = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setPantry((prevPantry) =>
        prevPantry.filter((pantry) => pantry.id !== _id)
      );
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, []);
  useEffect(() => {
    fetchPantry(userId);
  }, [userId]);

  if (token === null) {
    navigate("/login");
  } else {
    return (
      <div className="row page-wrap">
        <div className="mb-3 form-bg offset-3 col-6 py-3">
          <div className="mx-3">
            <h1>Create a Pantry Item</h1>
            <form
              onSubmit={handleSubmit}
              id="create-ingredient-form"
              placeholder="Name of Pantry">
              <div className="grid">
                <label htmlFor="name">Search Ingredients</label>
                <div className="d-flex flex-row">
                  <input
                    type="text"
                    placeholder="Type here what you have in your pantry..."
                    value={searchIngredient}
                    onChange={(e) => setSearchIngredient(e.target.value)}
                    className="form-control w-75"
                  />&nbsp;&nbsp;&nbsp;
                  <button
                    onClick={handleSearch}
                    type="button"
                    className="button">
                    Search
                  </button>
                </div>
              </div>

              <div className="dropdown">
                <select
                  onChange={handleSubmit}
                  name="ingredients"
                  id="ingredients"
                  className="dropdown"
                >
                  <option value="">Choose an Ingredient</option>
                  {filter.map((ingredient) => {
                    return (
                      <option
                        value={[ingredient.name, ingredient.recipe]}
                        key={ingredient.name}>
                        {ingredient.name}
                      </option>
                    );
                  })}
                </select>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Items in Pantry</th>
                      <th>Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pantry.map((pantry_item) => {
                      return (
                        <tr key={pantry_item.name}>
                          <td>{pantry_item.name}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleDelete(pantry_item.id)}
                              className="delete-button">
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </form>
            <div className="d-flex justify-content-center">
            <Link to={"/recipes/search"}>
              <button className="button">
                See what's for dinner!
              </button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PantryForm;
