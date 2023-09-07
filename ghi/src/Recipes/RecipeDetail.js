import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetailPage() {
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const {recipeid}  = useParams();

  const fetchSingleRecipe = async () => {
    const url = `http://localhost:8000/api/recipes/${recipeid}`;
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setRecipe(data);
      let ingredientList = [];
      for (let key in data.ingredients) {
        let tempList = [];
        tempList.push(key);
        tempList.push(data.ingredients[key]);
        ingredientList.push(tempList);
        tempList = [];
      }
      setIngredients(ingredientList)
    }
  };



  useEffect(() => {
      fetchSingleRecipe();
  }, []);


return (
    <div className="container-fluid">
      <div classname="page-wrap">
        <div className="row">
          <div className="col">
            <div className="card text-center mt-4">
              <img src={recipe.thumbnail} className="card-img-top" alt="Recipe Thumbnail" />
              <div className="card-body d-flex flex-column">
                <div className="title-card">
                  <h2 className="card-title text-truncate">{recipe.name}</h2>
                </div>
                <p className="card-text">{recipe.area} {recipe.category}</p>
                <p className="card-text">{recipe.instructions}</p>
                <div className="mt-auto">
                  <table className="table table-bordered">
                    <tbody>
                      {ingredients.map((ingnames, index) => (
                        <tr key={index}>
                          <td>{ingnames[0]}</td>
                          <td>{ingnames[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
