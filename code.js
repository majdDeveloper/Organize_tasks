// create var 
let box = document.querySelector("form");
let input = document.getElementsByClassName("title")[0];
let description = document.getElementsByClassName("text")[0];
let add_task = document.getElementsByClassName("submit")[0];
let result = document.getElementsByClassName("result")[0];
let delAll = document.getElementsByClassName("delAll")[0];

// create array set task object
let arrayTasks = [];
// If there loaded window get tasks in arrayTasks 
if (localStorage.getItem("tasks")) {
    arrayTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();
// add task for arrayTasks and result
add_task.onclick = function(ele) {
    ele.preventDefault();
    if(input.value != "" && description.value != "") {
        createElement(input, description);
        addElementForPage(arrayTasks);
        window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
    }
}
// add task for arrayTasks
function createElement(title, word) {
    let task = {
        id: Date.now(),
        index: arrayTasks.length + 1,
        title: title.value,
        desc: word.value,
    }
    if (title.value.length <= 20) {
            arrayTasks.push(task);
            input.value = "";
            description.value = "";
            window.scrollTo({
                top: 100000000,
                behavior: "smooth"
            })
        } else {
        let msg = window.alert("The task title must not contain more than 20 characters");
    }
}
// create same task if loaded page
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);
        addElementForPage(tasks);
    }
}
// add task for page
function addElementForPage(taskPage) {
    result.innerHTML = "";
    taskPage.forEach((task) => {
        let div = document.createElement("div");
        div.id = `task${taskPage.indexOf(task) + 1}`
        div.setAttribute("data-id", task.id);
        let content = document.createElement("p");
        let deleted = document.createElement("i");
        deleted.className = "fa-solid fa-trash-can";
        deleted.id = "delete"
        let show = document.createElement("i");
        show.className = "fa-solid fa-eye";
        show.id = "show";
        content.appendChild(document.createTextNode(task.title));
        div.appendChild(content);
        div.appendChild(deleted);
        div.appendChild(show);
        deleted.title = "delete Task";
        show.title = "show Task";
        result.appendChild(div);
        check_del();
    })
}
// In case the task is deleted or show
result.addEventListener("click", (e) => {
    if(e.target.id == "delete") {
        e.target.parentElement.remove();
        arrayTasks.forEach((task) => {
            if (task.id == e.target.parentElement.getAttribute("data-id")) {
                arrayTasks.pop(task);
                // To delete the task from arrayTasks and localStorage
                window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
                if (result.innerHTML == "") {
                        arrayTasks = [];
                        result.innerHTML = ""
                        window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
                        check_del();
                }
            }
        })
        if (add_task.style.display == "none") {
            document.getElementById("save").remove();
            document.getElementById("del").remove();                    
            add_task.style.display = "block";
        }
        input.value = "";
        description.value = "";
    }
    // show or update task
    else if(e.target.id == "show") {
        arrayTasks.forEach((task) => {
            if (task.id == e.target.parentElement.getAttribute("data-id") && input.value == "" && description.value == "") {
                input.value = task.title;
                description.value = task.desc;
                add_task.style.display = "none"
                // create button Save update and delete update
                let save_update = document.createElement("input");
                let del_update = document.createElement("input");
                save_update.type = "submit";
                del_update.type = "submit";
                save_update.value = "Save update";
                del_update.value = "delete update";
                save_update.className = "submit";
                del_update.className = "submit";
                save_update.id = "save";
                del_update.id = "del";
                box.appendChild(save_update);
                box.appendChild(del_update);
                e.target.className = "fa-regular fa-eye-slash";
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
                // In case the task is Save update
                save_update.onclick = function(ele) {
                    ele.preventDefault();
                    arrayTasks.pop(task);
                    e.target.parentElement.remove();
                    add_task.click();
                    document.getElementById("save").remove();
                    document.getElementById("del").remove();                    
                    add_task.style.display = "block";
                    show.className = "fa-solid fa-eye";
                }
                // In case the task is delete update
                del_update.onclick = function(ele) {
                    ele.preventDefault();
                    input.value = "";
                    description.value = "";
                    e.target.id = "show";
                    document.getElementById("save").remove();
                    document.getElementById("del").remove();
                    add_task.style.display = "block";
                    show.className = "fa-solid fa-eye";
                }
                
                delAll.onclick = function() {
                    delete_all_tasks()
                    e.target.id = "show";
                    save_update.remove();
                    del_update.remove();
                    add_task.style.display = "block";
                }
            }
        })
    }
})
// Show if there is more than one task
function check_del(){
    if(arrayTasks.length > 1) {
        delAll.style.display = "block";
    }
}
// delete all task
function delete_all_tasks() {
    arrayTasks = [];
    result.innerHTML = ""
    window.localStorage.setItem("tasks", JSON.stringify(arrayTasks));
    input.value = "";
    description.value = "";
    delAll.remove()
}
delAll.onclick = function() {
    delete_all_tasks()
}

////////////////////DONE 