let userNameEl = document.getElementById("user-name")
let userNameAreaEl = document.getElementById("user-name-area");

let goButton = document.getElementById("goButton");
goButton.onclick = function(){
    let userNameInput = userNameEl.value;
    if(userNameInput === ""){
        alert("Enter Name");
        return;
    }
    localStorage.setItem("userName", JSON.stringify(userNameInput));
    userNameAreaEl.textContent = "Hello " + getUserName();
    userNameEl.value= "";
}

function getUserName(){
    let stringifiedUserName = localStorage.getItem("userName");
    let parsedUserName = JSON.parse(stringifiedUserName);
    if(parsedUserName === null){
        return null;
    }
    else{
        return parsedUserName;
    }
}

let username = getUserName();
if(username === null){
    userNameAreaEl.textContent = "";
}
else{
    userNameAreaEl.textContent = "Hello " + username;
}


let todoItemsContainer = document.getElementById("todoItemsContainer");
// let todoList = [{
//         text: "Learn HTML",
//         uniqueNo: 1
//     },
//     {
//         text: "Learn CSS",
//         uniqueNo: 2
//     },
//     {
//         text: "Learn JavaScript",
//         uniqueNo: 3
//     }
// ];

function getTodoFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoFromLocalStorage();
let todoCount = todoList.length;

function onTodoStatusChanged(labelId, todoId) {
    let labelEl = document.getElementById(labelId);
    labelEl.classList.toggle("checked");

    let todoItemindex = todoList.findIndex(function(eachItem){
        let eachItemId = "todo" + eachItem.uniqueNo;
            if(eachItemId === todoId){
                return true;
            }
            else{
                return false;
            }

        });

    let todoObject = todoList[todoItemindex];
    if(todoObject.isChecked){
        todoObject.isChecked = false;
    }
    else{
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoList,todoId) {
    let todoEl = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoEl);

    let deletedElementIndex = todoList.findIndex(function(eachItem){
        let eachItemId = "todo" + eachItem.uniqueNo;
            if(eachItemId === todoId){
                return true;
            }
            else{
                return false;
            }

        });

    todoList.splice(deletedElementIndex,1);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    inputElement.onclick = function() {
        onTodoStatusChanged(labelId,todoId);
    };

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId;
    if(todo.isChecked){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIconContainer.appendChild(deleteIcon);
    deleteIcon.onclick = function() {
        onDeleteTodo(todoList,todoId);
    };
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter Valid Input");
        return;
    }
    todoCount += 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElement.value = "";
}

let addTodoButton = document.getElementById("add-todo-button");
addTodoButton.onclick = function() {
    onAddTodo();
}

let saveTodoButton = document.getElementById("saveTodoButton");
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
    
};