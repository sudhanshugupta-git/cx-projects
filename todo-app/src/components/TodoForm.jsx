import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');
  const [highlight, setHighlight] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
        setHighlight(true); 
        setTimeout(() => setHighlight(false), 500); 
        return;
    }
    addTodo(task);
    setTask('')
    setHighlight('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className={highlight ? 'highlight' : ''} 
      />
      <button type="submit"><FaPlus/></button>
    </form>
  );
};

export default TodoForm;
