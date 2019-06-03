import React from 'react';

function Main (props) {
  return (
    <div>
      Author: {props.data.by}
      Score: {props.data.score}
      Time: {props.data.time}
      Title: {props.data.title}
      Url: {props.data.url}
      <a
        href="# "
        onClick={ (e) => props.changeComponent(e, "Thread", props.data) }
        >
        Comments: {props.data.kids === undefined ? "0" : props.data.kids.length}
      </a>
    </div>
  );
}

export default Main;
