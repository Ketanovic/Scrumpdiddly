import React, { useState, useEffect } from "react";

function PantryForm() {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('')
    const [filter, setFilter] = useState('')
    const [searchIngredient, setSearchIngredient] = useState('')
    const handleChange = (event) => {
        const value = event.target.value;
        setName(value);
    };

    async function fetchIngredients(){
        const response = await fetch("http://localhost:8000/api/ingredients");
        if (response.ok) {
            const data = await response.json();
            setIngredients(Object.keys(data.ingredients));
            setFilter(data.ingredients);
        }
    }

    const handleSearch = async () => {
    const result = ingredients.filter((ingredients) =>
        ingredients.name.startswith(searchIngredient)
        );
        setFilter(result)
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {"name": name}
        const url = 'http://localhost:8000/api/pantry_item/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setName('');
        } else {
            console.error(response);
        }
    };

    useEffect(()=> {
        fetchIngredients();
    }, [])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Pantry Item</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Pantry Name</label>
                            <input required onChange={handleChange} value={name} name="name" id="name" type="text" className="form-control" />
                        </div>
                        <h1>What Ingredients Do You Have?</h1>
                        <div className="mb-3">
                            <label htmlFor="name">Ingredients</label>
                            <select onChange={handleSearch} value={ingredients} required name="ingredients" id="ingredients" className="form-control" />
                            <option value="">Choose an ingredient</option>
                            {ingredients.map(ingredient => {
                                return (
                                    <option key={ingredient.name} value={ingredient.name}>
                                        {ingredient.name}
                                    </option>
                                )
                            })}
                        </div>
                        <button className="btn btn-primary">Create</button>
                    <h1>Input Ingredients you have at Home!</h1>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default PantryForm;
