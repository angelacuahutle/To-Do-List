import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import update from './track';
import {
  createItem,
  updateItemStatus,
  removeItem
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
          <span>${itemElement.duties}</span>
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
      <span>${itemElement.duties}</span>
    </div>
    <span class="material-icons edit-icon" style=" cursor: pointer">
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
  List.sort((a, b) => (a.index > b.index ? 1 : -1));
  List.forEach((itemElement) => {
    addItemTodo(itemElement);
  });
}

function storeTodosLocally() {
  localStorage.setItem('listArr', JSON.stringify(List));
}

function ReplaceTodoItemForCompletedTask(itemElement) {
  const html = `
  
  <div>
  <span class="material-icons edit-icon" style=" cursor: pointer; color: green">
      done
  </span>
    <strike><span>${itemElement.duties}</span></strike>
  </div>
  <span class="material-icons edit-icon" style=" cursor: pointer">
      more_vert
  </span>
    `;

  return html;
}

function changeCompletedItem(index) {
  update(List[index]);
  saveTodosLocally();
  if (List[index].completed) {
    const completedElement = ReplaceTodoItemForCompletedTask(List[index]);
    const todoElements = document.querySelectorAll('itemElement-item');
    todoElements[index].innerHTML = completedElement;
  }
}

function addEventsToCheckboxes() {
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox, index) => {
    if (recievedIndex) {
      if (recievedIndex === index) {
        checkbox.addEventListener('change', () => {
          changeElementToCompleted(index);
        });
      }
    } else {
      checkbox.addEventListener('change', () => {
        changeElementToCompleted(index);
      });
    }
  });
}

function addEventsToEditIcons() {
  const editIcons = document.querySelectorAll('.edit-icon');
  const todoElements = document.querySelectorAll('todo-element');

  List.forEach((itemElement, index) => {
    editIcons[index].addEventListener('click', () => {
      const div = document.createElement('div');
      div.classList.add('flex', 'todo-element');
      div.style.backgroundColor = '#FFFBAE';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkbox');
      checkbox.checked = itemElement.completed;

      const input = document.createElement('input');
      input.type = 'text';
      input.classList.add('edit-input');
      input.value = itemElement.duties;
      input.style.backgroundColor = 'transparent';

      const span = document.createElement('span');
      span.classList.add('material-icons', 'edit-icon');
      span.style.marginLeft = 'auto';
      span.style.cursor = 'pointer';
      span.innerHTML = 'delete';

      div.appendChild(checkbox);
      div.appendChild(input);
      div.appendChild(span);

      todoElements[index].replaceWith(div)

      input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
          const itemElement = List[index];
          itemElement.duties = input.value;
          updateItemStatus(itemElement, List[index]);
          const html = ReplaceItemTodo(itemElement);
          div.innerHTML = html;
          addEventsToEditIcons();
          saveTodosLocally();
          div.style.backgroundColor = 'white';
        }
      });


/////////////////////////


function displaylistArr() {
  listArr.sort((a, b) => (a.index > b.index ? 1 : -1));
  listArr.forEach((itemElement) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="flex">
        <div>
        <input type="checkbox" class="checkbox"
        ${itemElement.completed ? 'checked' : ''}>
          <span>${itemElement.duties}</span>
        </div>
        <span class="material-icons">
            more_vert
        </span>
      </div>
      <hr>`;
    button.parentElement.insertBefore(li, button);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const oldlistArr = JSON.parse(localStorage.getItem('listArr'));
  if (oldlistArr) {
    listArr = oldlistArr;
  }
  displaylistArr();
  addEventsToCheckboxes();
});