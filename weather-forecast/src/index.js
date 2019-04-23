import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleCityInputChange = this.handleCityInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleCityInputChange(e) {
    this.props.onCityInputChange(e.target.value);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }
  render() {
    const cityName = this.props.cityName;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={cityName}
          onChange={this.handleCityInputChange} />
        <input
          type="submit"
          value="Submit"
          />
      </form>
    );
  }
}
class Week extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}
class Day extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      cityName: "",
      name: ""
    };
    this.handleCityInputChange = this.handleCityInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getWeather(city, country) {
    return fetch('https://samples.openweathermap.org/data/2.5/forecast?q={city},{country}&appid=e74587f77136920cc8551103a502e698')
      .then(response => response.json())
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData)
      })
      .catch((error) => {
        // handle your errors here
        console.error(error)
      })
  }
  handleCityInputChange(name) {
    this.setState({
      cityName: name
    });
  }
  handleSubmit() {
    this.getWeather(this.state.cityName, "uk");
  }

  render() {
    return (
      <div>
        <Search 
          cityName={this.state.cityName}
          onCityInputChange={this.handleCityInputChange}
          onSubmit={this.handleSubmit}
        />
        <Week />
        <Day />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);