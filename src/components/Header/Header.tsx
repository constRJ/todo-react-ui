import React from "react";

interface HeaderProps {
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnFocus: () => void;
  handleOnBlur: () => void;
  handleCreateTodos: () => void;
  isFocus: boolean;
  todosValue: string;
}

const Header: React.FC<HeaderProps> = ({
  handleInput,
  handleOnFocus,
  handleOnBlur,
  handleCreateTodos,
  isFocus,
  todosValue,
}) => {
  return (
    <div className="todo__header">
      <h1>To Do App</h1>
      <form className="todo-form">
        <div className="todo-form__group">
          <label
            className={
              isFocus
                ? "todo-form__group--input-label focusing"
                : "todo-form__group--input-label"
            }
          >
            Enter a Task Here
          </label>
          <input
            className="todo-form__group--input"
            type="text"
            name="task"
            onChange={handleInput}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            value={todosValue}
          />
        </div>
        <div className="todo-form__group">
          <button
            type="button"
            className="btn btn-blue-50"
            onClick={handleCreateTodos}
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};
export default Header;
