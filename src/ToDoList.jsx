import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTask, setEditingTask] = useState('');

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    const trimmedTask = newTask.trim();
    if (trimmedTask && !tasks.includes(trimmedTask)) {
      setTasks([...tasks, trimmedTask]);
      setNewTask('');
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function startEditing(index) {
    setEditingIndex(index);
    setEditingTask(tasks[index]);
  }

  function handleEditChange(event) {
    setEditingTask(event.target.value);
  }

  function saveEdit() {
    const trimmedEdit = editingTask.trim();
    if (trimmedEdit && !tasks.includes(trimmedEdit)) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? trimmedEdit : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditingTask('');
    }
  }

  return (
    <div className='app'>
      <h1>To-Do List</h1>
      <div className='input'>
        <input
          type='text'
          placeholder='Enter a Task...'
          value={newTask}
          onChange={handleInputChange}
        />
        <button className='add-button' onClick={addTask}>ADD</button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <div className='task-item'>
              {editingIndex === index ? (
                <div className='edit-task'>
                  <input
                    type='text'
                    value={editingTask}
                    onChange={handleEditChange}
                  />
                  <button className='save-button' onClick={saveEdit}>SAVE</button>
                </div>
              ) : (
                <span className='text'>{task}</span>
              )}
              <div className='task-buttons'>
                <button className='edit-button' onClick={() => startEditing(index)}>Edit</button>
                <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
