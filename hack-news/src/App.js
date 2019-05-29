import React from 'react';
import Thread from './components/Thread';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      postList: [],
      data: []
    };
  }
  async componentDidMount() {
    await this.fetchPostList("topstories");
    await this.state.postList.forEach(element => {
      this.fetchItem(element);
      console.log(this.state.data);
    });
    //126809
    this.setState({ isLoading:false });
    console.log("done");
  }
  async fetchPostList(query) {
    try {
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/${query}.json`);
      const data = await response.json();
      this.setState({ postList: data.splice(0,10)});
    } catch (error) {
      throw Error(error);
    }
  }
  async fetchItem(query) {
    try {
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${query}.json`);
      const data = await response.json();
      this.setState( previousState => {
        console.log(previousState)
        const list = [...previousState.data, data];
        return { data: list };
      });
    } catch (error) {
      throw Error(error);
    }
  }
  render() {
    const threads = this.state.data.map( item => <Thread key={item.id} data={item} />);
    return (
      <div className="App">
        { this.state.isLoading ? <p>Loading...</p> : threads }
      </div>
    );
  }
}

export default App;