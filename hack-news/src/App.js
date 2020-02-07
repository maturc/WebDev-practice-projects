import React from 'react';
import Main from './components/Main';
import Thread from './components/Thread';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      postList: [],
      postData: [],
      component: "New",
      thread: {}
    };
    this.changeComponent = this.changeComponent.bind(this);
  }
  async componentDidMount() {
    await this.fetchPostList("topstories");
    this.state.postList.forEach(element => {
      this.fetchItem(element);
    });
    this.setState({ isLoading: false });
  }
  async fetchPostList(query) {
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/${query}.json`);
      const data = await response.json();
      this.setState({ postList: data.splice(0,16)});
  }
  async fetchItem(query) {
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${query}.json`);
      const data = await response.json();
      this.setState( previousState => {
        const list = [...previousState.postData, data];
        return { postData: list };
      });
  }
  changeComponent(e, name, data) {
    e.preventDefault();
    this.setState({
      component: name,
      thread: data
    });
  }
  renderComponent() {
    switch (this.state.component) {
      case "Thread":
        return (
          <div>
            <Thread
              key={this.state.thread.id}
              data={this.state.thread}
              isLoadingComments={this.state.isLoadingComments}
              fetchComment={this.fetchComment}
              loadComments={this.loadComments}
            />
          </div>
        );
      default:
        return (
          this.state.postData.map( item =>
            <Main 
              key={item.id}
              data={item}
              changeComponent={this.changeComponent}
            />
          )
        );
    }
  }
  render() {
    
    return (
      <div className="app">
        <div className="logo">
          HACKER NEWS CLONE
        </div>
        { this.state.isLoading ? <p>Loading...</p> : this.renderComponent() }
      </div>
    );
  }
}

export default App;