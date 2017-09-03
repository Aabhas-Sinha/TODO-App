var StatusENUMS = {
    ACTIVE : "ACTIVE",
    COMPLETE : "COMPLETE",
    DELETED : "DELETED"
};
var todos = {
    1 : {title : "Learn Javascript", status: StatusENUMS.ACTIVE},
    2 : {title : "Git Tutorial", status: StatusENUMS.ACTIVE},
    3 : {title : "Interactive Git", status: StatusENUMS.ACTIVE},
    4 : {title : "Advanced Javascript", status: StatusENUMS.COMPLETE},
    5 : {title : "Express for beginners", status: StatusENUMS.COMPLETE},
    6 : {title : "Understanding Body Parser", status: StatusENUMS.COMPLETE},
    7 : {title : "Learn Bootstrap", status: StatusENUMS.DELETED},
    8 : {title : "Bootstrap Designs", status: StatusENUMS.DELETED},
    9 : {title : "DOM tools", status: StatusENUMS.DELETED},
};
var next_todo_id = 4;
module.exports = {
    StatusENUMS : StatusENUMS,
    todos : todos,
    next_todo_id : next_todo_id
};