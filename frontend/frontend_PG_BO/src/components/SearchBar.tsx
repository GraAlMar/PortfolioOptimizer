import { useState } from "react";
import React from "react";
import styles from "./Style.module.css"


export interface SearchBarProps {
    onSaveSearchTerm: (searchTerm: string) => void;
    title: string;
}

const SearchBar: React.FC<SearchBarProps> = ({  onSaveSearchTerm, title }) => {
    const [searchInput, setSearchInput] = useState("");

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSaveSearchTerm(searchInput);
    };


      

    return (
        <form className="SearchForm" onSubmit={onSubmit}>
      <div className="control">
        <label className={styles.label} htmlFor="search">Search by {title}:</label>
        <input className={styles.input}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          name="name"
          id="name"
        />
      </div>
 
      <div className="buttons">
        <button className={styles.button} type="submit" >
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