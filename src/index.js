import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import update from './track';
import { addItem, updateItemStatus, removeItem } from './ItemsDriver';

const button = document.querySelector('button');

class List {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

let listArr = [];

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

function storeTodosLocally() {
  localStorage.setItem('listArr', JSON.stringify(listArr));
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
