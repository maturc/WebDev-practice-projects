import React from 'react';

function ToDoItem() {
  return (
    <div className="todo-item">
      <input type="checkbox" checked="false"/>
      <p>This is a checklist item</p>
    </div>
  );
}

export default ToDoItem;