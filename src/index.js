import './style.css';
import 'bootstrap/dist/css/bootstrap.css';

const listArr = [{
    index: 0,
    duties: 'Finish repo',
    completed: false
  },
  {
    index: 1,
    duties: 'Study session',
    completed: false
  },
  {
    index: 2,
    duties: 'Meet partner',
    completed: true
  },
];

function displaylistArr() {
  listArr.forEach((itemElement) => { 
    const li = document.createElement('li')
    li.innerHTML = `<li class= "list-group-item">${itemElement.duties}</li>`
    li.appendChild
  })
}

window.addEventListener('DOMContentLoaded', () => {
displaylistArr();
});
console.log(listArr)
