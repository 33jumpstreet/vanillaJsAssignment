const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList');

const TODOS_LS = 'toDos';

let toDos = [];

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintTodo(text) {
  // console.log(text);
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1;
  delBtn.innerText = "❌"
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);

  const toDoObj = {
    text : text,
    id : newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTodo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedtoDos = localStorage.getItem(TODOS_LS);
  if (loadedtoDos !== null) {
    // console.log(loadedtoDos);
    const parsedToDos = JSON.parse(loadedtoDos);
    // console.log(parsedToDos);
    parsedToDos.forEach(function(toDo) {
      // console.log(toDO.text);
      paintTodo(toDo.text);
    });
  } 
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();