import React from 'react';
import * as d3 from "d3";

class Graphs extends React.Component {
  constructor(props) {
    super(props);
    this.drawTempGraph = this.drawTempGraph.bind(this);
    this.drawRainGraph = this.drawRainGraph.bind(this);
    this.drawWindGraph = this.drawWindGraph.bind(this);
  }
  componentDidMount() {
    this.drawTempGraph();
    this.dateTime();
  }
  removeGraph() {
    d3.select(".graph")
    .selectAll("*")
    .remove()
  }
  dateTime() {
    let dateTimeArray = [...this.props.dateTimeArray];
    dateTimeArray.splice(8);
    d3.select(".dt")
      .selectAll("time")
      .data(dateTimeArray)
        .enter()
        .append("time")
        .text(function(d) { return d; }) 
  }
  drawTempGraph() {
    let temperatureArray = [...this.props.temperatureArray];
    temperatureArray.splice(8);
    const heightScale = d3.scaleLinear()
      .domain([0, 60])
      .range([0, 500]);
    this.removeGraph();
    d3.select(".graph")
      .selectAll("temp")
      .data(temperatureArray)
        .enter()
        .append("temp")
        .style("height", function(d) { return heightScale(d) + "px"; })
        .append("p")
        .text(function(d) { return d + "°C"; })
  }
  drawRainGraph() {
    let precipitationArray = [...this.props.precipitationArray];
    precipitationArray.splice(8);
    const heightScale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, 500]);
    this.removeGraph();
    d3.select(".graph")
      .selectAll("rain")
      .data(precipitationArray)
        .enter()
        .append("rain")
        .style("height", function(d) { return heightScale(d) + "px"; })
        .append("p")
        .text(function(d) { return d + "%"; })
  }
  drawWindGraph() {
    let windArray = [...this.props.windArray];
    windArray.splice(8);
    const heightScale = d3.scaleLinear()
      .domain([0, 20])
      .range([0, 500]);
    this.removeGraph();
    d3.select(".graph")
      .selectAll("wind")
      .data(windArray)
        .enter()
        .append("wind")
        .style("height", function(d) { return heightScale(d) + "px"; })
        .append("p")
        .text(function(d) { return d + "m/s"; })
  }
  render() {
    return (
      <div>
        <button onClick={this.drawTempGraph}>Temperature</button>
        <button onClick={this.drawRainGraph}>Precipitation</button>
        <button onClick={this.drawWindGraph}>Wind</button>
        <div className="graph"></div>
        <div className="dt"></div>
      </div>
    );
  }
}

export default Graphs;