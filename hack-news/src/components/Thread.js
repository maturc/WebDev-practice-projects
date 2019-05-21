import React from 'react';

function Thread (props) {
  //error coz didn't load
  const test = props.data.kids;
  console.log(test.length);
  return (
    <div>
      Author: {props.data.by}
      Score: {props.data.score}
      Time: {props.data.time}
      Title: {props.data.title}
      Url: {props.data.url}
      Comments: {test}
    </div>
  );
}

export default Thread;
