import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from "d3";
import './main.css';
//C &#8451; F &#8457;
function Days(props) {
  return (
    <div>{/*add d3 graphs*/}</div>
  );
}
class Graphs extends React.Component {
  constructor(props) {
    super(props);
    this.drawTempGraph = this.drawTempGraph.bind(this);
    this.drawRainGraph = this.drawRainGraph.bind(this);
    this.drawWindGraph = this.drawWindGraph.bind(this);
  }
  componentDidMount() {
    this.drawTempGraph();
  }
  drawTempGraph() {
    const heightScale = d3.scaleLinear()
      .domain([0, 60])
      .range([0, 1000]);
    d3.select(".graph")
      .selectAll("div")
      .remove()
    d3.select(".graph")
      .selectAll("div")
      .data(this.props.temperatureArray)
        .enter()
        .append("div")
        .style("height", function(d) { return heightScale(d) + "px"; })
        .text(function(d) { return d + "°C"; })
    console.log("%c temperature array", "font-weight: bold;" );
    console.log(this.props.temperatureArray);
  }
  drawRainGraph() {
    const heightScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 1000]);
    d3.select(".graph")
      .selectAll("div")
      .remove()
    d3.select(".graph")
      .selectAll("div")
      .data(this.props.precipitationArray)
        .enter()
        .append("div")
        .style("height", function(d) { return heightScale(d) + "px"; })
        .text(function(d) { return d + "%"; })
    console.log("rendered");
    console.log(this.props.precipitationArray);
    console.log("rendered");
  }
  drawWindGraph() {
    const heightScale = d3.scaleLinear()
      .domain([0, 20])
      .range([0, 1000]);
    d3.select(".graph")
      .selectAll("div")
      .remove()
    const g = d3.select(".graph")
      .selectAll("div")
      .data(this.props.windArray)
        .enter()
        .append("div")
        .style("height", function(d) { return heightScale(d) + "px"; })
        .text(function(d) { return d + "m/s"; })
    console.log("rendered");
  }
  render() {
    return (
      <div>
        <div>
          <button onClick={this.drawTempGraph}>Temperature</button>
          <button onClick={this.drawRainGraph}>Precipitation</button>
          <button onClick={this.drawWindGraph}>Wind</button>
        </div>
        <div className="graph"></div>
      </div>
    );
  }
}
function WeatherDisplay(props) {
  if(props.weatherForecast.cod === "404") {
    return (
      <span>City not found.</span>
    );
  }
  else if(props.renderWeatherDisplay) {
    const weatherForecast = props.weatherForecast;
    console.log(weatherForecast);
    const cityName = weatherForecast.city.name;
    const countryName = weatherForecast.city.country;
    let rain;
    if (weatherForecast.list[0].hasOwnProperty("rain")) {
      rain = weatherForecast.list[0].rain['3h']*10;
    } else {
      rain = 0;
    }

    return (
      <div>
        <div>
          <h1>{cityName}, {countryName}</h1>
          <span>{weatherForecast.list[0].dt}</span>
          <span>{weatherForecast.list[0].weather[0].description}</span>
        </div>
        <div>
          icon
          {Math.round(weatherForecast.list[0].main.temp-272.15)}&#8451;
        </div>
        <div>
          <span>Precipitation: {rain}&#37;</span>
          <span>Humidity: {weatherForecast.list[0].main.humidity}&#37;</span>
          <span>Wind: {weatherForecast.list[0].wind.speed} m/s</span>
        </div>
        <Graphs
          weatherForecast={props.weatherForecast}
          temperatureArray={props.temperatureArray}
          precipitationArray={props.precipitationArray}
          windArray={props.windArray}
          dateTimeArray={props.dateTimeArray}
        />
        <Days/>
      </div>
    );
  } else {
    return null;
  }
}
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
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: "",
      countryName: "",
      renderWeatherDisplay: false,
      weatherForecast: {},
      temperatureArray: [],
      precipitationArray: [],
      windArray: [],
      dateTimeArray: []
    };
    this.handleCityInputChange = this.handleCityInputChange.bind(this);
    this.handleCountryInputChange = this.handleCountryInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  getWeather = async (city, country) => {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=e74587f77136920cc8551103a502e698`);
    const response = await api_call.json();
    return response;
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
  async handleSubmit(e) {
    e.preventDefault();
    const weatherForecastObj = await this.getWeather(this.state.cityName, this.state.countryName);
    //add condition for change state if getweather fails
    let temperature = [];
    let precipitation = [];
    let wind = [];
    let dTime = [];
    weatherForecastObj.list.forEach(element => {
      temperature.push(Math.round(element.main.temp-272.15));
      //rain can have a NaN value
      if (!element.hasOwnProperty("rain")) {
          precipitation.push(0);
      } else if (isNaN(element.rain['3h'])) {
          precipitation.push(0);
      } else {
        precipitation.push(Math.round(element.rain['3h']*10));
      }
      wind.push(element.wind.speed);
      dTime.push(element.dt)
    });
    this.setState({
      renderWeatherDisplay: true,
      weatherForecast: weatherForecastObj,
      temperatureArray: temperature,
      precipitationArray: precipitation,
      windArray: wind,
      dateTimeArray: dTime
    });
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
        <WeatherDisplay 
          cityName={this.state.cityName}
          countryName={this.state.countryName}
          renderWeatherDisplay={this.state.renderWeatherDisplay}
          weatherForecast={this.state.weatherForecast}
          temperatureArray={this.state.temperatureArray}
          precipitationArray={this.state.precipitationArray}
          windArray={this.state.windArray}
          dateTimeArray={this.state.dateTimeArray}
        />
      </div>
    );
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);