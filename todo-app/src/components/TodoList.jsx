import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setCount(count + 1);
  };

  const completeTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        if (!todo.completed) {
          setCount(count - 1);
        } else {
          setCount(count + 1);
        }
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  const removeTodo = (id) => {
    const removedTodo = todos.find(todo => todo.id === id);
    if (removedTodo && !removedTodo.completed) {
      setCount(count - 1);
    }
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const removeAll = (id) => {
    setCount(0);
    setTodos([]);
  };

  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <TodoForm addTodo={addTodo} />
      <div className="todo-list">
        <>
          {/* {todos.map(todo => (
              <TodoItem  
                key={todo.id} 
                todo={todo} 
                completeTodo={completeTodo} 
                removeTodo={removeTodo} 
              />
            ))} */}
          <AnimatePresence>
            {todos.map(todo => (
              <motion.div
                key={todo.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <TodoItem
                  todo={todo}
                  completeTodo={completeTodo}
                  removeTodo={removeTodo}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="footer">
            <p>You have {count} pending tasks {' '}
              {count === 0 ? '🎉' : ''}</p>
            <button onClick={removeAll}>Clear All</button>
          </div>
        </>
      </div>
    </div>
  );
};

export default TodoList;
