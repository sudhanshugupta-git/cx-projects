import { useState, useRef } from 'react';
import { FaPlus } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { animate } from "motion/mini"

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState('');
  const [highlight, setHighlight] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task) {
      // setHighlight(true);
      // setTimeout(() => setHighlight(false), 500);
      console.log(inputRef);
      const input = inputRef.current;
      animate(input, { scale: 1.05 }, { duration: 0.5 }).then(()=>
        animate(input, { scale: 1 }, { duration: 0 })
      )
      return;
    }
    addTodo(task);
    setTask('')
    setHighlight('');
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        ref = {inputRef}
        type="text"
        placeholder="Add a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        // className={highlight ? 'highlight' : ''}
      />

      <motion.button type="submit" whileTap={{ scale: 0.95 }}>
        < FaPlus />
      </motion.button>
    </form>
  );
};

export default TodoForm;


