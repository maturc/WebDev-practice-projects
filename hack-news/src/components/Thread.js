import React from 'react';
import Comment from './Comment';

function Thread (props) {
  const comments = props.data.kids.map( async item => {
    console.log(item);
    const data = await props.fetchComment(item);
    console.log(data);
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