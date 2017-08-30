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
function add_todo_elements(id, todos_data_json) {
    var parent = document.getElementById(id);
    parent.innerHTML = todos_data_json;
}