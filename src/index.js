import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import update from './track';
import {
  createItem,
  updateItemStatus,
  removeItem,
} from './ItemsDriver';

const button = document.querySelector('button');

class List {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

let listArr = [];

function createItemTodo(itemElement) {
  const li = document.createElement('li');
  li.innerHTML = `
    <div class="flex todo-element">
      <div>
          <input type="checkbox" class="checkbox"
          ${itemElement.completed ? 'checked' : ''}>
          <span>${itemElement.description}</span>
      </div>
      <span class="material-icons edit-icon" style="cursor: pointer">
          more_vert
      </span>
    </div>
    <hr>`;
  return li;
}

function ReplaceItemTodo(itemElement) {
  const html = `
    <div>
      <input type="checkbox" class="checkbox" 
      ${itemElement.completed ? 'checked' : ''}>
      <span>${itemElement.description}</span>
    </div>
    <span class="material-icons edit-icon" style="cursor: pointer">
        more_vert
    </span>
      `;
  return html;
}

function addItemTodo(itemElement) {
  const li = createItemTodo(itemElement);
  button.parentElement.insertBefore(li, button);
}

function itemElement() {
  listArr.sort((a, b) => (a.index > b.index ? 1 : -1));
  listArr.forEach((itemElement) => {
    addItemTodo(itemElement);
  });
}

function storeTodosLocally() {
  localStorage.setItem('todo', JSON.stringify(listArr));
}

function ReplaceTodoItemForCompletedTask(itemElement) {
  const html = `
  
  <div>
  <span class="material-icons edit-icon" style="cursor: pointer; color: green">
      done
  </span>
    <strike><span>${itemElement.description}</span></strike>
  </div>
  <span class="material-icons edit-icon" style= "cursor: pointer">
      more_vert
  </span>
    `;

  return html;
}

function changeCompletedItem(index) {
  update(listArr[index]);
  storeTodosLocally();
  if (listArr[index].completed) {
    const completedElement = ReplaceTodoItemForCompletedTask(listArr[index]);
    const todoElements = document.querySelectorAll('.todo-element');
    todoElements[index].innerHTML = completedElement;
  }
}

function addEventsToCheckboxes(recievedIndex) {
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox, index) => {
    if (recievedIndex) {
      if (recievedIndex === index) {
        checkbox.addEventListener('change', () => {
          changeCompletedItem(index);
        });
      }
    } else {
      checkbox.addEventListener('change', () => {
        changeCompletedItem(index);
      });
    }
  });
}

function addEventsToEditIcons() {
  const editIcons = document.querySelectorAll('.edit-icon');
  const todoElements = document.querySelectorAll('.todo-element');

  listArr.forEach((todo, index) => {
    editIcons[index].addEventListener('click', () => {
      const div = document.createElement('div');
      div.classList.add('flex', 'todo-element');
      div.style.backgroundColor = '#FFFBAE';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkbox');
      checkbox.checked = todo.completed;

      const input = document.createElement('input');
      input.type = 'text';
      input.classList.add('edit-input');
      input.value = todo.description;
      input.style.backgroundColor = 'transparent';

      const span = document.createElement('span');
      span.classList.add('material-icons', 'edit-icon');
      span.style.marginLeft = 'auto';
      span.style.cursor = 'pointer';
      span.innerHTML = 'delete';

      div.appendChild(checkbox);
      div.appendChild(input);
      div.appendChild(span);

      todoElements[index].replaceWith(div);

      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          const todo = listArr[index];
          todo.description = input.value;
          updateItemStatus(todo, listArr[index]);
          const html = ReplaceItemTodo(todo);
          div.innerHTML = html;
          addEventsToEditIcons();
          storeTodosLocally();
          div.style.backgroundColor = 'white';
        }
      });

      span.addEventListener('click', () => {
        storeTodosLocally();
        removeItem(todo, listArr);
        div.parentElement.remove();
        storeTodosLocally();
      });
    });
  });
}

window.addEventListener('load', () => {
  const oldlistArr = JSON.parse(localStorage.getItem('todo'));
  if (oldlistArr) {
    listArr = oldlistArr;
  }

  itemElement();
  addEventsToCheckboxes();
  addEventsToEditIcons();
});

function addEventListenerToInput() {
  const input = document.querySelector('#input');
  input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      const itemElement = new List(input.value, false, listArr.length + 1);
      createItem(itemElement, listArr);
      addItemTodo(itemElement);
      storeTodosLocally();
      input.value = '';
      addEventsToEditIcons(listArr.length);
      addEventsToCheckboxes(listArr.length - 1);
    }
  });
}

addEventListenerToInput();

button.addEventListener('click', () => {
  const todoElements = document.querySelectorAll('.todo-element');
  const removedTodos = [];
  for (let i = 0; i < listArr.length; i += 1) {
    if (listArr[i].completed === true) {
      removedTodos.push(listArr[i]);
      todoElements[i].parentNode.remove();
    }
  }

  removedTodos.forEach((itemElement) => {
    removeItem(itemElement, listArr);
  });

  storeTodosLocally();
});
