import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Search extends React.Component {
  render() {
    const cityName = this.props.cityName;
    const countryName = this.props.countryName;
    const handleCityInputChange = this.props.handleCityInputChange;
    const handleCountryInputChange = this.props.handleCountryInputChange;
    const handleSubmit = this.props.handleSubmit;

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
}
class App extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      cityName: "",
      countryName: ""
    };
    this.handleCityInputChange = this.handleCityInputChange.bind(this);
    this.handleCountryInputChange = this.handleCountryInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getWeather = async (city, country) => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=e74587f77136920cc8551103a502e698`);  
    const response = await api_call.json();  
    console.log(response);    
  }
  handleCityInputChange(name) {
    this.setState({
      cityName: name
    });
  }
  handleCountryInputChange(name) {
    this.setState({
      countryName: name
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.getWeather(this.state.cityName, this.state.countryName);
  }

  render() {
    return (
      <div>
        <Search 
          cityName={this.state.cityName}
          countryName={this.state.countryName}
          handleCityInputChange={this.handleCityInputChange}
          handleCountryInputChange={this.handleCountryInputChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);