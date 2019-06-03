import React from 'react';
import Main from './components/Main';
import Thread from './components/Thread';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      postList: [],
      data: [],
      component: "New",
      thread: {}
    };
    this.changeComponent = this.changeComponent.bind(this);
  }
  async componentDidMount() {
    await this.fetchPostList("topstories");
    await this.state.postList.forEach(element => {
      this.fetchItem(element);
    });
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
  changeComponent(e, name, data){
    e.preventDefault();
    this.setState({
      component: name,
      thread: data
    });
  }
  renderComponent() {
    switch (this.state.component) {
      case "Thread":
        return <Thread key={this.state.thread.id} data={this.state.thread} fetchItem={this.fetchItem}/>;
      default:
        return this.state.data.map( item => <Main key={item.id} data={item} changeComponent={this.changeComponent} />);
    }
  }
  render() {
    
    return (
      <div className="App">
        { this.state.isLoading ? <p>Loading...</p> : this.renderComponent() }
      </div>
    );
  }
}

export default App;