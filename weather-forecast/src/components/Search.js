import React from 'react';

function Search(props) {
  const cityName = props.cityName;
  const countryName = props.countryName;
  const handleCityInputChange = props.handleCityInputChange;
  const handleCountryInputChange = props.handleCountryInputChange;
  const handleSubmit = props.handleSubmit;
  return (
    <form onSubmit={(e) => handleSubmit(e)} >
      <input
        type="text"
        value={cityName}
        placeholder="City..."
        onChange={(e) => handleCityInputChange(e.target.value)} />
      <input
        type="text"
        value={countryName}
        placeholder="Country..."
        onChange={(e) => handleCountryInputChange(e.target.value)} />
      <input
        type="submit"
        value="Submit"
      />
    </form>
  );
}

export default Search;