var express = require("express");
var bodyParser = require("body-parser");
var todos_db = require("./seed.js");
var app = express();
app.listen(4000);

app.use("/",function (req,res,next) {
    next();
});

app.use("/", express.static(__dirname+"/public"));

app.use("/", bodyParser.urlencoded({extended:false}));

app.get("/api/todos", function(req, res){
    res.json(todos_db.todos);
});

app.post("/api/todos", function(req, res){
    var todo = req.body.todo_title;
    if (!todo || todo == "" || todo.trim() == ""){
        res.status(400).json({error : "Todo Title Can't Be Empty"});
    }
    else {
        var new_todo_object = {
            title : req.body.todo_title,
            status : todos_db.StatusENUMS.ACTIVE
        };
        todos_db.todos[todos_db.next_todo_id] = new_todo_object;
        todos_db.next_todo_id = todos_db.next_todo_id + 1;
        res.json(todos_db.todos);
    }
});

app.delete("/api/todos/:id", function(req, res) {
    var del_id = req.params.id;
    var todo = todos_db.todos[del_id];
    if (!todo) {
        res.status(400).json({error: "Todo doesn't exist"});
    }
    else {
        todo.status = todos_db.StatusENUMS.DELETED;
        res.json(todos_db.todos);
    }
});

app.put("/api/todos/:id", function(req, res) {
    var mod_id = req.params.id;
    var todo = todos_db.todos[mod_id];
    if (!todo) {
        res.status(400).json({error: "Can't modify a todo that doesnt exist"});
    }
    else {
        var todo_title = req.body.todo_title;
        if (todo_title && todo_title != "" && todo_title.trim() != "") {
            todo.title = todo_title;
        }
        var todo_status = req.body.todo_status;
        if (todo_status &&
            (todo_status == todos_db.StatusENUMS.ACTIVE ||
                todo_status == todos_db.StatusENUMS.COMPLETE )
        ) {
            todo.status = todo_status;
        }
        res.json(todos_db.todos);
    }
});
console.log("local host : 4000");


