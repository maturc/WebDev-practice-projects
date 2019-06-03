import React from 'react';

function Comment (props) {
  return (
    <div>
      {console.log(props)}
      Author: {props.data.by}
      Time: {props.data.time}
      Comment: {props.data.text}
    </div>
  );
}

export default Comment;