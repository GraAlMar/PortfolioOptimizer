import React from "react";


interface InstantSearchBarProps {
    handleChange: (e: React.ChangeEvent) => void
}
const InstantSearchBar: React.FC<InstantSearchBarProps> = ({ handleChange }) => (
    <div>Search by name:
      <input placeholder="search" onChange={handleChange} />
    </div>
  );
  
 
  

export default InstantSearchBar;