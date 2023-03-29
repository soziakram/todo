import { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useGetTodosQuery,useAddTodoMutation,useCompleteTodoMutation,useDeleteTodoMutation } from "../../app/api/todo";

const TodoList = () => {
  // const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [completeTodo] = useCompleteTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const { data: todos } = useGetTodosQuery();
  const [ addTodo,{ isLoding, isError }]=useAddTodoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    addTodo({ text: newTodo.trim(), completed: false })
    //  // setTodos([...todos, { text: newTodo.trim(), completed: false }]);
    setNewTodo("");
  };

  const handleDelete = (todo) => {
    deleteTodo(todo )
    // setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  const handleToggleCompletion = (todo) => {
    completeTodo({...todo, completed: !todo.completed})
    // setTodos((prevTodos) =>
    //   prevTodos.map((todo, i) =>
    //    i === index ? { ...todo, completed: !todo.completed } : todo
    //   )
    // );
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label htmlFor="newTodo" className="sr-only">
          New todo
        </label>
        <div className="flex">
          <input
            type="text"
            id="newTodo"
            className="flex-1 rounded-l-md border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 py-2 px-4 sm:text-sm"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white rounded-r-md px-4 py-2 transition-colors duration-150 ml-2"
          >
            Add
          </button>
        </div>
      </form>
      <ul className="border border-gray-300 rounded-md divide-y divide-gray-300">
        {todos?.map((todo, index) => (
          <li
            key={index}
            className={`flex items-center py-4 px-6 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <button
              type="button"
              onClick={() => handleToggleCompletion(todo)}
              className="text-gray-500 hover:text-green-500 transition-colors duration-150"
            >
              {todo.completed ? (
                <CheckCircleIcon className="h-5 w-5" />
              ) : (
                <div className="h-5 w-5 border border-gray-300 rounded-full" />
              )}
            </button>
            <span className="flex-1 ml-3">{todo.text}</span>
            <button
              type="button"
              onClick={() => handleDelete(todo)}
              className="text-gray-500 hover:text-red-500 transition-colors duration-150"
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
