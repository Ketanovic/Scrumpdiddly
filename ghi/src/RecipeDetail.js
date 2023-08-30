import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function RecipeDetail(props) {

    let {name} = useParams();

    const [visits, setVisits] = useState('');

    async function fetchVisits() {
        const response = await fetch(`http://localhost:8000/recipes/${name}/`)

        if (response.ok){
            const parsedJson = await response.json();
            setVisits(parsedJson.visits);
        }
    }



    useEffect(() => {
        fetchVisits();
    }, []);


    return (
        <div>
            fgsjfd
        </div>
    );
};

    export default RecipeDetail;