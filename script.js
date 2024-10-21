let todoStr = localStorage.getItem('todo_data');
let todolist = todoStr ? JSON.parse(todoStr) : [];

let inputElement = document.querySelector('#todo-input');
let dateElement = document.querySelector('#todo-date');
let addBtnElement = document.querySelector('#add-btn');

addBtnElement.addEventListener("click", addTodo);

displayTodo();

function addTodo() {

  let inputData = inputElement.value;
  let dateData = dateElement.value;

  if (inputData != '' && dateData != '') {  
    todolist.push({todoInput: inputData, todoDate: dateData});
    
    inputElement.value = '';
    dateElement.value = '';
  } else {
    return alert('Please Fill the Inputs!');
  } 
  
  displayTodo();
}

function displayTodo() {
  let containerElement = document.querySelector('.todo-container');
  
  localStorage.setItem('todo_data', JSON.stringify(todolist));
  
  let innerHTML = '';

  for (let i = 0; i < todolist.length; i++) {
    innerHTML += ` 
      <div class="row justify-content-center m-2">
        <div class="col-5">
          ${todolist[i].todoInput}
        </div>
        <div class="col-4">
          ${todolist[i].todoDate}
        </div>
        <div class="col-3">
          <button class="btn btn-outline-danger p-2" onclick="
          todolist.splice(${i}, 1);
          displayTodo();
          ">Delete <i class="bi bi-dash-circle"></i></button>
        </div>
      </div> 
    `
  }

  containerElement.innerHTML = innerHTML;
}


