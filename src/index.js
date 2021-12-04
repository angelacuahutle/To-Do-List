import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import update from './track';
import { createItem, updateItemStatus, removeItem } from './ItemsDriver';

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
    <div class="flex">
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


function addEventsToCheckboxes() {
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
      update(listArr[index]);
      storeTodosLocally();
    });
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
