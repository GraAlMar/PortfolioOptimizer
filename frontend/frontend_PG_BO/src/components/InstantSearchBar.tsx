import React from "react";
import { InstantSearchBarProps } from "../data/InstantSearchBarProps";


const InstantSearchBar: React.FC<InstantSearchBarProps> = ({ handleChange }) => (
    <div>Search by name:
      <input placeholder="search" onChange={handleChange} />
    </div>
  );
  
 
  

export default InstantSearchBar;