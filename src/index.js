import './style.css';

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


window.onload = () => {
  const itemList = document.querySelector('.list');
  listArr.forEach((listItem) => {
    const li = document.createElement('li');
    li.className = 'list-item';
    li.innerHTML = `
    <label class="${listItem.completed ? 'list-completed' : ''}">
      <input type="tickbox" class="list-item-checked" ${listItem.completed ? 'checked' : ''}>
      ${todoItem.describtion}
    </label>
    <i class="fas fa-ellipsis-v item-edit-icon"></i>
    `;
    itemList.appendChild(li);
  });

  document.querySelector('.btn-clear').addEventListener('click', () => {
    console.log('asds')
  })
}
