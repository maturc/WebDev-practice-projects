import React from 'react';

function Comment (props) {
  return (
    <div>
      Author: {props.data.by}
      Score: {props.data.score}
      Time: {props.data.time}
      Comment: {props.data.comment}
    </div>
  );
}

export default Comment;