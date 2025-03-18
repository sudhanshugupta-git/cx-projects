import { FaTrash } from 'react-icons/fa';

const TodoItem = ({ todo, completeTodo, removeTodo }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`} >
      <span onClick={() => completeTodo(todo.id)}>{todo.text}</span>
      <div className="actions">
        <FaTrash className="delete" onClick={() => removeTodo(todo.id)} />
      </div>
    </div>
  );
};

export default TodoItem;
