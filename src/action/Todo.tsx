type PropsToggleTodo = {
  _id: number;
  task: string;
  done: boolean;
};

export const ToggleTodo = (todo: PropsToggleTodo) => {
  return {
    _id: todo._id,
    task: todo.task,
    done: !todo.done,
  };
};
