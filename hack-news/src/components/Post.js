import React from 'react';
import Comment from './Comment';

function Post (props) {
  const comments = this.props.data.kids.map( item => <Comment key={item.id} data={item} />);
  return (
    <div>
      Author: {props.data.by}
      Score: {props.data.score}
      Time: {props.data.time}
      Title: {props.data.title}
      Url: {props.data.url}
      {comments}
    </div>
  );
}

export default Post;