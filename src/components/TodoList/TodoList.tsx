import React from "react";

interface todos {
  _id: string;
  task: string;
  done: boolean;
}

interface TodoListProps {
  todos: todos[];
  removeTodos: (_id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, removeTodos }) => {
  return (
    <div className="todo-list">
      <table className="todo-table">
        <thead className="todo-table__thead">
          <tr className="todo-table__thead--row">
            <th>Todo Item</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="todo-table__tbody">
          {todos.length === 0 ? (
            <tr className="todo-table__tbody--row no-data">
              <th colSpan={3}>No Todos</th>
            </tr>
          ) : (
            todos.map(({ task, done, _id }, index) => {
              return (
                <tr
                  className="todo-table__tbody--row"
                  key={index}
                  data-id={_id}
                >
                  <td>{task}</td>
                  <td>{done ? "Complete" : "In progress"}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-crimson-50"
                      onClick={() => removeTodos(_id)}
                    >
                      DELETE
                    </button>
                    <button type="button" className="btn btn-green-30">
                      FINISHED
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
