import React from 'react';

export default function (props) {
  const done = props.completed ? 'Done' : 'Not Done';
  return (
    <div className='todoItem'>
      <h3>{ props.title }</h3>
      <p>{ props.desc }</p>
      <p>{ done }</p>
      <p>{ props.added }</p>
    </div>
  );
}
