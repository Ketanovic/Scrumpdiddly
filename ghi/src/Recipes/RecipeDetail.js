import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetRecipeQuery } from "../app/apiSlice";

export default function RecipeDetailPage() {
    const { id } = useParams();
    const { data, isLoading } = useGetRecipeQuery(id);
    // const [ingredients, setIngredients] = useState([]);

    if (isLoading) return <>Loading...</>;

    console.log(data.ingredients);

    // let ingredientList = [];
    // for (let key in data.ingredients) {
    //     let tempList = [];
    //     tempList.push(key);
    //     tempList.push(data.ingredients[key]);
    //     ingredientList.push(tempList);
    // }
    // setIngredients(ingredientList);

    return (
        <div className="page-wrap container">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={data.thumbnail}
                        className="img-fluid"
                        alt="Recipe Thumbnail"
                    />
                </div>
                <div className="col-md-6">
                    <div
                        className="card"
                        style={{ maxHeight: "800px", overflowY: "auto" }}
                    >
                        <div className="card-body">
                            <h2 className="card-title">{data.name}</h2>
                            <p className="card-text">
                                {data.area} {data.category}
                            </p>
                            <p className="card-text">{data.instructions}</p>
                            <div className="mt-4">
                                <table className="table table-bordered">
                                    <tbody>
                                        {data.ingredients.map((ingnames, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {ingnames[0].toUpperCase()}
                                                </td>
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
