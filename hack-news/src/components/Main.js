import React from 'react';

function Main (props) {
  let regex = /\/\/(.*?)\//;

  return (
    <div className="post">
      <span className="title">{props.data.title} <span className="lighter-text">{props.data.url === undefined ? "" : "(" + regex.exec(props.data.url)[1]+")"}</span></span>
      <span className="description lighter-text">
        {props.data.score} points
        by {props.data.by}
        &nbsp;at {new Date(props.data.time * 1e3).toISOString().slice(-13, -5)}&nbsp;
        <a
          href="# "
          onClick={ (e) => props.changeComponent(e, "Thread", props.data) }
          >
          Comments: {props.data.kids === undefined ? "0" : props.data.kids.length}
        </a>
      </span>
    </div>
  );
}

export default Main;
