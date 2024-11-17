import React from 'react';
import { FaSearch } from "react-icons/fa";

const SearchCountry = () => {
    return (
        <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
                type='text'
                className="search-country"
                placeholder="Search country"
            />
        </div>
    );
};

export default SearchCountry;
