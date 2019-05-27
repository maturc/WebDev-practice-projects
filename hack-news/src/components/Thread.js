import React from 'react';

function Thread (props) {
  return (
    <div>
      Author: {props.data.by}
      Score: {props.data.score}
      Time: {props.data.time}
      Title: {props.data.title}
      Url: {props.data.url}
  {/*Comments: {props.data.kids.length}*/}
    </div>
  );
}

export default Thread;
