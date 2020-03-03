import * as React from 'react';

function SearchBar() {
  return (
    <div className="header__searchbar">
      <input className="header__searchbar-input" type="text" name="search" id="search"/>
      <img className="header__searchbar-icon" src="./search.svg" alt="" />
    </div>
  );
}
  
export default SearchBar;