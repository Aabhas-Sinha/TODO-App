const RESPONSE_DONE = 4;
const STATUS_OK = 200;
NEW_TODO_INPUT_ID = "new_todo_input";
var Active = document.getElementById("todos_list_div_active");
var Completed = document.getElementById("todos_list_div_completed");
var Deleted=document.getElementById("todos_list_div_deleted");

function updateList(jsondata) {
    Active.innerHTML="";
    Completed.innerHTML="";
    Deleted.innerHTML="";
    var todos = JSON.parse(jsondata.toString());
    console.log(todos);
    Object.keys(todos).forEach(
        function (key) {
            var todo_element = createTodoElement(key,todos[key]);
            switch (todos[key].status){
                case "ACTIVE":
                    Active.appendChild(todo_element);
                    break;
                case "COMPLETE":
                    Completed.appendChild(todo_element);
                    break;
                case "DELETED":
                    Deleted.appendChild(todo_element);
                    break;

            }
        }
    )
};

function createTodoElement(id, todo_object) {
    var todo_element = document.createElement('div');
    todo_element.innerText = todo_object.title;
    todo_element.setAttribute("style", "border: 0 none;");
    if(todo_object.status == "ACTIVE" || todo_object.status == "COMPLETE"){
        todo_element.innerText = "";
        var complete_box = document.createElement('div');
        complete_box.setAttribute("class", "checkbox checkbox-success");
        var checkbox = document.createElement("input");
        checkbox.setAttribute("id", "chk"+id);
        checkbox.setAttribute("class", "styled");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("onclick", "completeTodoAJAX(" + id + ")");
        if(todo_object.status === "COMPLETE")
            checkbox.setAttribute('checked','checked');
        var label = document.createElement("label");
        label.setAttribute("for", "chk"+id);
        label.innerText = todo_object.title;
        if(todo_object.status === "COMPLETE")
            label.setAttribute("style","text-decoration: line-through; ")
        var delete_button = document.createElement("button");
        delete_button.setAttribute("class", "btn btn-default");
        delete_button.setAttribute("onclick", "deleteTodoAJAX(" + id +")");
        delete_button.setAttribute("style", "color:#FF0000; position: absolute; right:0; border: 0 none; ")
        var span = document.createElement("span");
        span.setAttribute("class", "glyphicon glyphicon-remove");
        delete_button.appendChild(span);
        todo_element.appendChild(checkbox);
        todo_element.appendChild(label);
        todo_element.appendChild(delete_button);
    }
    return todo_element;
}

function deleteTodoAJAX(id){
    console.log("Delete Pressed for id "+id);
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=DELETED";
    console.log(data);
    xhr.send(data);
    getJsonData();
};

function getJsonData(){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos", true);
    xhr.onreadystatechange = function(){
        if (xhr.readyState == RESPONSE_DONE){
            if(xhr.status == STATUS_OK){
                updateList(xhr.responseText);
            }
        }
    };
    xhr.send(data=null);
};

function addTodoAJAX(){
    var title= document.getElementById(NEW_TODO_INPUT_ID).value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/todos", true);
    xhr.setRequestHeader(
        "Content-type", "application/x-www-form-urlencoded"
    );
    var data = "todo_title=" + encodeURI(title);
    xhr.send(data);
    getJsonData();
}

function completeTodoAJAX(id){
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", "/api/todos/"+id, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    data = "todo_status=COMPLETE";
    console.log(data);
    xhr.send(data);
    getJsonData();
};
getJsonData();