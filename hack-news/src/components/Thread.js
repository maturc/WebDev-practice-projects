import React from 'react';
import Comment from './Comment';

function Thread (props) {
  const comments = props.data.kids.map( async item => {
    const data = await props.fetchComment(item)
    console.log("---------data-------------");
    console.log(data);
    return await (<Comment key={data.id} data={data} />);
  });
  console.log("-----------after data---comment-----------");
  return (
    <div>
      Author: {props.data.by}
      Score: {props.data.score}
      Time: {props.data.time}
      Title: {props.data.title}
      Url: {props.data.url}
      { comments }
    </div>
  );
}

export default Thread;