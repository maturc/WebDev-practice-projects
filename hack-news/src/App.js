import React from 'react';
import Thread from './components/Thread';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      data: {}
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true});
    fetch("https://hacker-news.firebaseio.com/v0/item/8863.json")
      .then( response => response.json())
      .then( data => this.setState({ isLoading:false, data}));
  }
  render() {
    var a = undefined;
    //else there is an error coz of async fetch
    if(!this.state.isLoading) {
      a=<Thread data={this.state.data} />
    }
    return (
      <div className="App">
        
        {a}
      </div>
    );
  }
}

export default App;
