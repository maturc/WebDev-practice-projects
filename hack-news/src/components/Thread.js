import React from 'react';
import Comment from './Comment';

function Thread (props) {
  const comments = props.data.kids.map( async item => {
    const data = await props.fetchItem(item);
    return <Comment key={data.id} data={data} />;
  });
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

export default Thread;