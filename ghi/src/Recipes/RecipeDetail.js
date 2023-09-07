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
    <div className="page-wrap container">
      <div className="row">
        <div className="col-md-6">
          <img src={recipe.thumbnail} className="img-fluid" alt="Recipe Thumbnail" />
        </div>
        <div className="col-md-6">
          <div className="card" style={{ maxHeight: '800px', overflowY: 'auto' }}>
            <div className="card-body">
              <h2 className="card-title">{recipe.name}</h2>
              <p className="card-text">{recipe.area} {recipe.category}</p>
              <p className="card-text">{recipe.instructions}</p>
                <div className="mt-4">
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
  );
}
