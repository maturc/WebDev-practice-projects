import React from 'react';
import Comment from './Comment';

class Thread extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoadingComments: true,
      commentList: []
    }
  }
  async componentDidMount() {
    await this.props.data.kids.forEach(element => {
      this.fetchComment(element);
    });
    this.setState({ isLoadingComments: false });
  }
  async fetchComment(query) {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${query}.json`);
    const data = await response.json();
    this.setState( previousState => {
      const list = [...previousState.commentList, data];
      return { commentList: list };
    });
  }
  renderComponent() {
    return this.state.commentList.map( (item)=> {
      return (
        <div>
          <Comment 
            key={item.id}
            data={item}
          />
        </div>);
    });
  }
  render() {
    return (
      <div>
        <div className="post">
          <span className="title">
            {this.props.data.title}
            {this.props.data.url}
          </span>
          <span className="description">
            {this.props.data.score} points
            by {this.props.data.by}
            at {new Date(this.props.data.time * 1e3).toISOString().slice(-13, -5)}
          </span>
          <hr></hr>
        </div>
        { this.state.isLoadingComments ? <p>Loading...</p> : this.renderComponent() }
      </div>
    );
  }
}
export default Thread;