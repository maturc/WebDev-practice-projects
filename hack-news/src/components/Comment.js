import React from 'react';

function Comment (props) {
  return (
    <div className="post">
      <span className="comment">
        {props.data.text}
      </span>
      <span className="description lighter-text">
        By {props.data.by}
        at {new Date(props.data.time * 1e3).toISOString().slice(-13, -5)}
      </span>
    </div>
  );
}

export default Comment;