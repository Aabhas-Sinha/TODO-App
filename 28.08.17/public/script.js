const RESPONSE_DONE = 4;
const STATUS_OK = 200;
const TODO_LIST_ID = "todos_list_div";
console.log("works!");
function getTodosAJAX(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function () {
        //callback for open
        if(xhr.readyState == RESPONSE_DONE){
            //is response ok?
            //status code == 200
            if(xhr.status == STATUS_OK){
                console.log(xhr.response);
                add_todo_elements(TODO_LIST_ID, xhr.response);
            }
        }
    }
    xhr.send(data = null);
}

window.onload = getTodosAJAX();

function add_todo_elements(id, todos_data_json) {
    var todos = JSON.parse(todos_data_json);
    var parent = document.getElementById(id);
    if(parent){
        parent.innerHTML = "";
        Object.keys(todos).forEach(function(key){
            var todo_element = createTodoElement(key, todos[key]);
            parent.appendChild(todo_element);
        })
    }
}
function addTodoAJAX(){
    var title = document.getElementById("new_todo_input").value;
    console.log(title);
    var xhr = new XMLHttpRequest();
    xhr.open("POST","/api/todos",true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "title="+encodeURI(title);
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                add_todo_elements(TODO_LIST_ID, xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}

function createTodoElement(id, todo_object){
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("data-id", id);
    todo_element.setAttribute("class","todoStatus"+todo_object.status);
    if(todo_object.status == "ACTIVE"){
        var complete_button = document.createElement("button");
        complete_button.innerText = "Mark As Complete";
        complete_button.setAttribute("onclick","completeTodoAJAX("+id+")");
        todo_element.appendChild(complete_button);
    }if(todo_object.status == "ACTIVE" || todo_object.status == "COMPLETE"){
        var delete_button = document.createElement("button");
        delete_button.innerText = "Delete this todo";
        delete_button.setAttribute("onclick","deleteTodoAJAX("+id+")");
        todo_element.appendChild(delete_button);
    }
    return todo_element;
}
function deleteTodoAJAX(id){
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "id=" + encodeURI(id)
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                add_todo_elements(TODO_LIST_ID, xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}
function completeTodoAJAX(id){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    var data = "id=" + encodeURI(id)
    xhr.onreadystatechange = function () {
        if(xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                add_todo_elements(TODO_LIST_ID, xhr.responseText);
            }
            else{
                console.log(xhr.responseText);
            }
        }
    }
    xhr.send(data);
}