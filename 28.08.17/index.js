var express = require('express');
var todo_db = require("./seed.js");
var bodyparser = require('body-parser');
var app = express();


app.listen(4000);
app.use("/", express.static(__dirname+"/public"));

app.get("/api/todos", function (req, res) {
    res.json(todo_db.todos);
});

app.delete("/api/todos/:id", function (req, res) {
    var deleteID = req.params.id;
    var todo = todo_db.todos[deleteID];
    if(!todo){
        res.status(400).json({error: "Todo does not exist"});
    }
    else{
        todo.status = todo_db.statusENUMS.DELETED;
        res.json(todo_db.todos);
    }
});

app.use("/",bodyparser.urlencoded({extended: false}));
app.post("/api/todos", function (req, res) {
    var todo_title = req.body.title;
    if(!todo_title || todo_title == "" || todo_title.trim() == ""){
        res.status(400).json({error: "Todo Title cannot be empty"});
    }
    else{
        var new_todo = {
            title : todo_title,
            status : todo_db.statusENUMS.ACTIVE
        }

        var todo_status = req.body.status;
        if(todo_status && (todo_status == "COMPLETE" || todo_status == "ACTIVE")){
            new_todo.status = todo_status;
        }
        todo_db.todos[todo_db.next_todo_id++] = new_todo;
        res.json(todo_db.todos);
    }
})
app.put("/api/todos/:id",function(req, res){
    var put_id = req.params.id;
    var todo = todo_db.todos[put_id];
    if(!todo || todo.status == todo_db.statusENUMS.DELETED){
        res.status(400).json({error: "Todo does not exist"});
    }
    else{
        todo.status = todo_db.statusENUMS.COMPLETE;
        res.json(todo_db.todos);
    }
})