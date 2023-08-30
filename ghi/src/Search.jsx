import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';
import { search, reset } from "./app/searchSlice";

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('search');
        dispatch(search(searchInput));
    }
    return (
        <form className="row" onSubmit={handleSubmit}>
            <div className="col">
                <input className="form-control form-control-lg"
                type="text"
                placeholder="search recipe"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                />
            </div>
            <div className="col">
                <button className="btn btn-lg btn-success" type="submit">Search</button>
                <button
                    className="btn btn-lg btn-link"
                    type="button"
                    onClick={() => {
                        dispatch(reset())
                        setSearchInput('');
                    }}
                >
                        reset
                </button>
            </div>
        </form>
    )
}

export default Search;
