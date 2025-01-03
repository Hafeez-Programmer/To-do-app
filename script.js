let todoStr = localStorage.getItem('todo_data');
let todolist = todoStr ? JSON.parse(todoStr) : [];

// todo input elements.
let todoContentELement = document.querySelector('#todo-content');
let inputElement = document.querySelector('#todo-input');
let dateElement = document.querySelector('#todo-date');
let addBtnElement = document.querySelector('#add-btn');

addBtnElement.addEventListener("click", addTodo);

// todos container element.
let containerElement = document.querySelector('.todo-container');

// modal container element.
let updateModalElement = document.querySelector('#updateModal');
let modalTextELement = document.querySelector('#modalText');
let modalDateELement = document.querySelector('#modalDate');
let modalCloseBtnElement = document.querySelector('#modalCloseBtn');
let modalSaveBtnElement = document.querySelector('#modalSaveBtn');
let modalErrorELement = document.querySelector('#modalError');

displayTodo();

function addTodo() {

  let inputData = inputElement.value;

  let dateValue = new Date(dateElement.value);
  let dateData = dateValue.toDateString();

  if (inputData != '' && dateData != '') {  
    todolist.push({todoInput: inputData, todoDate: dateData});
    
    inputElement.value = '';
    dateElement.value = '';
  } else {
    return containerElement.innerHTML = displayError();
  } 
  
  displayTodo();
}

function displayTodo() {
  
  localStorage.setItem('todo_data', JSON.stringify(todolist));
  
  let innerHTML = '';

  for (let i = 0; i < todolist.length; i++) {
    innerHTML += ` 
      <div class="row justify-content-center m-2">
        <div id="todoText" class="col-4 col-md-5">
          ${todolist[i].todoInput}
        </div>
        <div class="col-4 col-md-5">
          ${todolist[i].todoDate}
        </div>

        <div class="col-2 col-md-1">
          <button class="btn btn-outline-primary" onclick="
          updateTodo(${i});
          displayTodo();
          ">✏️</button>
        </div>
        
        <div class="col-2 col-md-1">
          <button class="btn btn-outline-danger" onclick="
          todolist.splice(${i}, 1);
          displayTodo();
          ">🗑️</button>
        </div>
      </div> 
    `
  }

  containerElement.innerHTML = innerHTML;
}

function displayError() {
  return ` <div class="alert alert-danger d-flex align-items justify-content-between">
    <div>
      ⚠️ Please fill the inputs
    </div>
    <button type="button" class="btn-close" onclick="displayTodo();"></button>
  </div>
  `
}

function updateTodo(index) {
  updateModalElement.style.display = 'inline';
  todoContentELement.classList.add("blurred");

  
  modalSaveBtnElement.addEventListener("click", () => {
    const updateTodoText = modalTextELement.value;
    const modalDate = new Date (modalDateELement.value);
    const updateTodoDate = modalDate.toDateString();

      todolist[index].todoInput = updateTodoText;
      todolist[index].todoDate = updateTodoDate;
      
      localStorage.setItem('todo_data', JSON.stringify(todolist));
      
      updateModalElement.style.display = 'none';
      todoContentELement.classList.remove("blurred");
      displayTodo();
    
  })
  
  modalCloseBtnElement.addEventListener("click", () => {
    updateModalElement.style.display = 'none';
    todoContentELement.classList.remove("blurred");
  })
}

