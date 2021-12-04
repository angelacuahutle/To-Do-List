function createItem(todoItem, todoList) {
  todoList.push(todoItem);
}

function updateItemStatus(newTodo, oldTodo) {
  oldTodo = newTodo;
  return oldTodo;
}

function destroyTodo(todo, todoList) {
  const index = todoList.indexOf(todo);
  todoList.splice(index, 1);
  todoList.forEach((todo, currentIndex) => {
    if (currentIndex >= index) {
      todo.index -= 1;
    }
  });
}

export {
  createItem,
  destroyTodo,
  updateItemStatus,
};