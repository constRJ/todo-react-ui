import request from "api/Api";
import Header from "components/Header/Header";
import Pagination from "components/Pagination/Pagination";
import TodoList from "components/TodoList/TodoList";
import React, { useEffect, useState } from "react";

interface OUserTodos {
  done: boolean;
  task: string;
  __v: number;
  _id: string;
}

interface IUserTodos {
  task: string;
}

interface ITodosPagination {
  isLoading: boolean;
  currentPage: number;
  itemPerPage: number;
}
const TodoContainer = () => {
  const [todos, setTodos] = useState<Array<OUserTodos>>([]);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [todosText, setTodosText] = useState<IUserTodos>({
    task: "",
  });

  const [pagination, setPagination] = useState<ITodosPagination>({
    isLoading: false,
    currentPage: 1,
    itemPerPage: 3,
  });

  const { isLoading, currentPage, itemPerPage } = pagination;

  const onFocus = () => setIsFocus(true);

  const onBlur = () => {
    setIsFocus(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodosText({ ...todosText, [name]: value });
  };

  const getTodos = async () => {
    const { data } = await request.get("/todo");

    // Set loading to true
    setPagination({ ...pagination, isLoading: true });
    // Set the array of todos
    setTodos(data.data.todos);
    // Set loading to false
    setPagination({ ...pagination, isLoading: false });
  };

  const createTodos = async () => {
    const { data } = await request.post("/todo", todosText);

    setTodos(data.data.todos);
    setTodosText({ task: "" });
  };

  const removeTodos = async (id: string) => {
    const { data } = await request.delete("/todo/" + id);

    setTodos(data.data.todos);
    // setPagination({ ...pagination, currentPage: currentPage });
  };

  const getPaginatedTodos = () => {
    const startIndex = currentPage * itemPerPage - itemPerPage;
    const endIndex = startIndex + itemPerPage;

    return todos.slice(startIndex, endIndex);
  };

  const changePages = (page: number) => {
    setPagination({ ...pagination, currentPage: page });
  };

  useEffect(() => {
    getTodos();
  }, []);
  console.log(currentPage);
  return (
    <React.Fragment>
      <div className="todo-container">
        <div className="todo">
          <Header
            handleInput={handleInputChange}
            handleOnFocus={onFocus}
            handleOnBlur={onBlur}
            handleCreateTodos={createTodos}
            isFocus={isFocus}
            todosValue={todosText.task}
          />
          <TodoList todos={getPaginatedTodos()} removeTodos={removeTodos} />
          <Pagination
            todosLength={todos.length}
            currentPage={currentPage}
            itemPerPage={itemPerPage}
            changePage={changePages}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default TodoContainer;
