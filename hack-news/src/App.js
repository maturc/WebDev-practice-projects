import React from 'react';
import Thread from './components/Thread';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      postList: [],
      data: {}
    };
  }
  componentDidMount() {
    this.fetchPostList("topstories");
    this.state.postList.forEach(element => {
      this.fetchItem(element);
    });
    
    //126809
    this.setState({ isLoading:false });
    console.log("done");
  }
  
  fetchPostList(query) {
    fetch(`https://hacker-news.firebaseio.com/v0/${query}.json`)
      .then( response => response.json())
      .then( data => this.setState({ postList: data.splice(0,10)}))
      //.then( data => this.setState({ isLoading:false, data}))
    console.log(this.state.postList);
  }
  
 /* TODO look into why setstate for the version with promise doesn't update before console log runs, but async does
  async fetchPostList(query) {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/${query}.json`)
    const data = await response.json()
    this.setState({ postList: data.splice(0,10)});
    //.then( data => this.setState({ isLoading:false, data}))
    console.log(this.state.postList);
  }
  */
  fetchItem(query) {
    fetch(`https://hacker-news.firebaseio.com/v0/item/${query}.json`)
      .then( response => response.json())
      .then( data => this.setState( previousState => ({ ...previousState, data })))
      .catch(err => console.log(err));
  }
  mapItems() {

  }
  render() {
    console.log(this.state.postList);
    return (
      <div className="App">
        {this.state.isLoading ?
          <p>Loading...</p> :
          <Thread
            data={this.state.data}
          />
        }
      </div>
    );
  }
}

export default App;