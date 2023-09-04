import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import './App.css'
import {ReactComponent as AvatarIcon} from "./Avatar.svg";
import { CircularProgress } from '@mui/material';

const TodoColumn: React.FC = () => {
  const [todos, setTodos] = useState([]);
  const [loadedTasksCount, setLoadedTasksCount] = useState(0);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {
      setTodos(response.data);
      setLoadedTasksCount(response.data.length);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const generateRandomDescription = () => faker.lorem.sentence();

  return (
    <div className="todo-column">
      <div className="column-header">
        <span>Today ({loadedTasksCount})</span>
        <button disabled>+</button>
      </div>
      {todos.length
        ? <div className="task-list">
        {todos.map((todo: any) => (
          <div className="task" key={todo.id}>
            <div className="task-title">
              <input type="checkbox" checked={todo.completed} readOnly />
              {todo.title}
            </div>
            <div className="task-description">{generateRandomDescription()}</div>

            <div className="task-dates">
              <div className="date">startDate: {faker.date.past().toLocaleDateString()}</div>
              <div className="date">endDate: {faker.date.future().toLocaleDateString()}</div>
            </div>
            <div className='task-block'>
              <div className="task-tags">
                <div className="tag purple">Entity title</div>
                <div className="tag gray">Front-end</div>
              </div>
              <div className="user-avatar">
                <AvatarIcon/>
              </div>
            </div>
          </div>
        ))}
      </div> : <CircularProgress color="success" />}

    </div>
  );
};

export default TodoColumn;
