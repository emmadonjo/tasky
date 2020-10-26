export function Data(){

    this.getTasks = ()=>{

        return JSON.parse(localStorage.getItem("tasky_tasks"));
        
    },



    this.saveTask = (id, desc, priority, taskDate, taskTime, status)=>{
        //saves a task to local storage
        //Returns a string indcating the status of the action
        //@param id number - unique id of the task
        //@param desc string - description of the task
        //@param priority string - high, medium or low
        //@param taskDate date - scheduled date of the task
        //@param taskTime time - scheduled time of the task
        //@param status string - completed, pending or expired

        let allTasks = this.getTasks();
        if(allTasks === null){
            allTasks = [];
        }

        allTasks.push({
            "id": id,
            "desc": desc,
            "priority": priority,
            "taskDate": taskDate,
            "taskTime": taskTime,
            "status": status
        });

       localStorage.setItem("tasky_tasks", JSON.stringify(allTasks));
    },



    this.updateTask = (id, desc, priority, taskDate, taskTime, status)=>{
        //Updates an existing task
        //Returns a string indcating the status of the action
        //@param id number - unique id of the task
        //@param desc string - description of the task
        //@param priority string - high, medium or low
        //@param taskDate date - scheduled date of the task
        //@param taskTime time - scheduled time of the task
        //@param status string - completed, pending or expired

        let existingTasks = this.getTasks(); //get all the exisitng tasks
        let flag = false;

        for(let task in existingTasks){
            //search for the task using the id
            if(task['id'] == id){
                flag = true;
                task['desc'] = desc;
                task['priority'] = priority;
                task['taskDate'] = taskDate;
                task['taskTime'] = taskTime;
                task['status'] = status;
                break;
            }
        }

        if(flag){
            return true;
        }else{
            return false;
        }
    },

    this.deleteTask = id=>{
        //deletes a task from local storage
        //returns a string stating the status
        //@param id - unique id of the task to be deleted

        
        if(id != ""){
            let allTasks = this.getTasks();

            allTasks.forEach(x => {
                if(x.id == id){
                    let indexofX = allTasks.indexOf(x);
                    if(indexofX!=-1){
                        allTasks.splice(indexofX,1);
                        localStorage.setItem("tasky_tasks", JSON.stringify(allTasks));
                        console.log(x.id + " has been deleted");  
                        return true;               
                    }

                    //save the remaining tasks to local storage
                   
                }
            });
        }else{
            return false;
        }
    },


    this.getLastId = ()=>{
        //get the largest id in the storage
        let taskId = 1;
        let allTasks = this.getTasks();

        // loop through tasks and compare  the ids
        if(allTasks){

            for(let x = 0; x < allTasks.length; x++){
                if(parseInt(allTasks[x].id )>= taskId){
                    taskId = parseInt(allTasks[x].id) + 1; 
                }
            }
        }

        //return the largest id
        return taskId;

    }
    
}