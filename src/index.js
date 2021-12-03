import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

const button = document.querySelector('button');
const listArr = [{
  index: 0,
  duties: 'Finish repo',
  completed: false,
},
{
  index: 1,
  duties: 'Study session',
  completed: false,
},
{
  index: 2,
  duties: 'Meet partner',
  completed: true,
},
];

function displaylistArr() {
  listArr.forEach((itemElement) => {
    const li = document.createElement('li');
    li.innerHTML = `<div class="flex">
<div><input type="checkbox"><span class="margin-left">${itemElement.duties}</span></div><span class="material-icons">more_vert
</span>
</div>
<hr>`;
    button.parentElement.insertBefore(li, button);
  });
}

function displayTodos() {
  toDos.sort((a, b) => (a.index > b.index ? 1 : -1));
  toDos.forEach((element) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="flex">
        <div>
        <input type="checkbox" class="checkbox"
        ${element.completed ? 'checked' : ''}>
          <span>${element.description}</span>
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
  localStorage.setItem('toDos', JSON.stringify(toDos));
}

window.addEventListener('DOMContentLoaded', () => {
  const oldTodos = JSON.parse(localStorage.getItem('toDos'));
  if (oldTodos) {
    toDos = oldTodos;
  }
  displayTodos();
  addEventsToCheckboxes();
});
