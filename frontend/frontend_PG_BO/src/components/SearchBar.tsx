import { useState } from "react";
import React from "react";
import { SearchBarProps } from "../data/SearchBarProps";

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSaveSearchTerm, title }) => {
    const [searchInput, setSearchInput] = useState(searchTerm);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSaveSearchTerm(searchInput);
    };


      

    return (
        <form className="SearchForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="search">Search by {title}:</label>
        <input
          value={searchTerm}
          onChange={(e) => setSearchInput(e.target.value)}
          name="name"
          id="name"
        />
      </div>
 
      <div className="buttons">
        <button type="submit" >
          Submit
        </button>

        {/* <button type="button" onClick={onClear}>
          Clear
        </button> */}
      </div>
    </form>
    )
};

export default SearchBar;