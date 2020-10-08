
//import resources

//import styles and fonts
import "../css/fontawesome.min.css";
import "../css/solid.min.css";
import "../css/style.css";

//import js model file
import {Data} from "./model";

//declare variables
let mobileBtn = document.querySelector(".nav-btn");
let nav = document.querySelector("nav");
const model = new Data();



const toggleClass = (el, klass=[])=>{
    //add or remove a class  from an element
    //@param el string - element
    //@aram klass array - class to remove or add

    //loop through each of the class in klass
    for(let i = 0; i<klass.length; i++){

        //add or remove klass from the element
        el.classList.toggle(klass[i]);
    }
    
};

const display_tasks =(limit=0)=>{
    //returns a list of tasks based on the limit set
    //displays  tasks beginning from the recently added
    //@param limit int - number of tasks to display
    let el = document.querySelector(".insertTask");
    let numberOfTask = limit;
    let allTask = model.getTasks();
    let wrap =""; 

    if(allTask){
        if(limit == 0 || limit > allTask.length){
        numberOfTask = allTask.length;
        }
    }

    for(let i = numberOfTask-1; i >= 0; i--){
        wrap += `
            <div class='task-wrap'>
                <h2> ${allTask[i].desc}</h2>
                <div class='task-info'>
                    <span><i class='fas fa-calendar-alt'></i> ${allTask[i].taskDate}</span>
                    <span><i class='fas fa-clock'></i> ${allTask[i].taskTime}</span>
                `;
                if(allTask[i].status == "completed"){
                    wrap += `<span><i class='fas fa-check' title='Completed'></i></span>`;
                }else{
                    wrap += `<span><i class='fas fa-angle-down' title='Pending'></i></span>`;
                }
                
                wrap += `
                </div>
                <div class='task-controls'>
                    <button class='task-edit'>
                        <i class='fas fa-edit'></i>
                    </button>
                    <button class='task-delete'>
                        <i class='fas fa-trash'></i>
                    </button>
                    <button>
                        <input type='checkbox' class='select-task' />
                    </button>
                </div>
                <span class='task-id'>${allTask[i].id}</span>
            </div>
        `;

        
    }

    if(el){
        el.innerHTML = wrap;
    }
    
}

// select all tasks 
const selectAllTasks = ()=>{
    // retrieve a collection of all the inputs in the task list
    let inps = document.querySelectorAll(".select-task");
    let i = document.querySelector("#selectAll i");

    //loop through each checkbox
    //select the checkbox if not selected by calling the select() function
    if(i.className.indexOf("fa-square") >=0){
        for(let j = 0; j < inps.length; j++){
            inps[j].checked = true;
            i.classList.replace("fa-square", "fa-check");
        }
    }else{
        for(let j = 0; j < inps.length; j++){
            inps[j].checked = false;
            i.classList.replace("fa-check", "fa-square");
        }
    }
};

const deleteSelectedTask = (selectedTask)=>{
    if(selectedTask.length>0){
        //ask user if they actually want to delete the selected task(s)
        let ans =confirm("Are you sure you want to delete these tasks");

        if(ans){
            //get a collection of the selected task
            console.log("Deleted");
            for(let i =0; i < selectedTask.length; i++){
                let id = selectedTask[i].parentNode.parentNode.parentNode.querySelector(".task-id");
                model.deleteTask(id.textContent.trim());
            }

            display_tasks(0);
        }else{
            return false;
        }
    }
};


const addTask =()=>{
    //add a task to the storage
    const desc = document.querySelector("#desc");
    const priority = document.querySelector("#priority");
    const dueDate = document.querySelector("#date");
    const dueTime = document.querySelector("#time");
    const info = document.querySelector(".info");

    //gets the last id from localStorage and increments by 1
    const id = parseInt(model.getLastId());
    let status = "pending";
    let error = false;

    let msg = "<ul>";

    //validate inputs
    if(desc.value.trim() == ""){
        msg += "<li>Description is required</li>";
        error = true;
    }

    if(desc.value.length > 80){
        msg += "<li>Description must be within 80 characters</li>";
        error = true;
    }

    if(priority.value.trim() == ""){
        msg += "<li>Priority is required</li>";
        error = true;
    }

    if(dueTime.value.trim() == ""){
        msg += "<li>Time is required</li>";
        error = true;
    }

    if(dueDate.value.trim() == ""){
        msg += "<li>Date is required</li>";
        error = true;
    }

    //ensure date isn't past
    let splitDate = dueDate.value.split("-");
    let splitTime = dueTime.value.split(":");

    let submittedDateTime = new Date(splitDate[0], splitDate[1] -1, splitDate[2], splitTime[0], splitTime[1]);
    let currentDateTime = new Date();

    if(currentDateTime.getTime() >= submittedDateTime.getTime()){
        error = true;
        msg += "<li>The date/time is past</li>";
    }

    if(error){
        info.innerHTML = msg +"</ul>";
        console.log("error occurred");
    }else{
        model.saveTask(id,desc.value,priority.value,dueDate.value,dueTime.value, status);
        msg = "<li>Task saved successfully</li>";
        desc.value = "";
        desc.focus();
        priority.value = "";
        dueDate.value ="";
        dueTime.value = "";
        info.innerHTML = msg + "</ul>";
        display_tasks(5);
    }
}



//initial load the dashboard
window.addEventListener("load", ()=>{
    let url = "./views/dashboard.html";
    fetchPage(url);
});

//toggle mobile menu button
mobileBtn.addEventListener("click", ()=>{
    let btn = document.querySelector(".nav-btn i");
    toggleClass(nav, ["show-flex"]);
    toggleClass(btn, ["fa-bars"]);
    toggleClass(btn, ["fa-times"]);
});

//display pages based on the link a user clicked on
nav.addEventListener("click", e=>{
    let page;
    let pageTitle = document.querySelector(".page-title");

    if(e.target.nodeName == "LI"){
        page = e.target.className;
        
    }else if(e.target.nodeName == "I"){
        page = e.target.parentNode.className;
    }

    switch(page){
        case "add":
            pageTitle.textContent = " Add Task";
            const add_task = `
                <div class="wrapper">
                    <div class="show-task-after-add">
                        <form action="" method="post" class="add-task-form">
                            <h2 class="col-12">Add New Task</h2>
                            <p class="info"></p>
                            <div class="form-el">
                                <div class="form-group">
                                    <label for="desc">Description:</label>
                                    <textarea id="desc" rows="3" required maxlength="80" placeholder="Enter task description"></textarea>
                                </div>
                                <div class="form-prop">
                                    <div class="form-group">
                                        <label for="priority">Priority:</label>
                                        <select id="priority" required>
                                            <option value="">Select</option>
                                            <option value="high">High</option>
                                            <option value="medium">medium</option>
                                            <option value="low">Low</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="date">Due:</label>
                                        <input type="date" id="date" required/>
                                    </div>
                                    <div class="form-group">
                                        <label for="time">Time:</label>
                                        <input type="time" id="time" required/>
                                    </div>
                                </div>
                                    <div class="form-group">
                                        <button type="submit" id="submitTask">Add Task</button>
                                    </div>
                                
                            </div>
                        </form>
                        
                        <div class="show-insert-task insertTask">
                            Why arent you showing up men
                        </div>
                    </div>
                </div>
            `;

            document.querySelector("#root").innerHTML = add_task;
            const submitTask = document.querySelector("#submitTask");
            if(submitTask){
                submitTask.addEventListener("click", (e)=>{

                //prevent default submit behaviour
                e.preventDefault();
                
                //call addTask function
                    addTask();
            
                });
            }
            
            break;

        case "tasks":
            pageTitle.textContent = " All Tasks";
            let tasks  = `
                <div class="wrapper">
                    <div class="row">
                        <div class="col-12 controls">
                            <button id="selectAll" title="Select all tasks">
                                <i class="fas fa-square"></i>
                            </button>
                            <button id="filter" title="Filter tasks">
                                <i class="fas fa-filter"></i>
                            </button>

                            <button id="sort" title="Sort tasks">
                                <i class="fas fa-sort"></i>
                            </button>
                            <button id="deleteAll" title="Delete task(s)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>

                    <div class="row insertTask">
                        
                        
                    </div>
                </div>
            `;   
            document.querySelector("#root").innerHTML = tasks;
            const filterBtn = document.querySelector("#filter");
            const sortBtn = document.querySelector("#sort");
            const taskEditBtn = document.querySelectorAll(".task-edit");
            const taskDeleteBtn = document.querySelectorAll(".task-delete");
            const taskWrap = document.querySelectorAll(".task-wrap");
            const deleteAllBtn = document.querySelector("#deleteAll");
            const selectAllBtn = document.querySelector("#selectAll");

            //import tasks.js
            if(selectAllBtn){
                selectAllBtn.addEventListener("click", ()=>{
                    selectAllTasks();
                });
            }

            if(filterBtn){
                filterBtn.addEventListener("click",()=>{
                    //filter task
                });
            }

            if(sortBtn){
                sortBtn.addEventListener("click", ()=>{
                    //sort tasks
                });
            }

            //add functionality for individual task editing and deleting
            

            if(deleteAllBtn){
                deleteAllBtn.addEventListener("click", ()=>{
                let selected = document.querySelectorAll(".select-task:checked");

                deleteSelectedTask(selected);
            
                });
             }

            display_tasks(0);
            break;
        default:
            pageTitle.textContent = " Dashboard";
            let dashboard_html = `
                <div class="wrapper">
                    <div class="row">
                        <div class="col-6" id="monthlyChart">
                            <h1>Hello</h1>
                        </div>
                        <div class="col-6" id="priorityChart">

                        </div>
                    </div>

                    <div class="row">
                        <div class="col-12" id="incomingTask">

                        </div>
                    </div>
                </div>
            `;

            //import canvasjs.min.js
            //import dashboard.js
    }
    
});