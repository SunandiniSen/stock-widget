import { useState } from "react";
import "./Search.css";

export const Search = ({ search, submit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const onSubmit = () => {
        console.log(searchTerm);
        submit(searchTerm);
    }

    const change = (e) => {
        setSearchTerm(e.target.value);
        search(e.target.value);
    }

    return (
        <>
            <div className="search-box">
                <input
                    className="search-box-input"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => change(e)}
                />
                <button className="search-button" type="button" onClick={onSubmit}> Search </button>
            </div>
        </>
    )
}
