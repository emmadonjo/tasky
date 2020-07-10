const session = {
	session_start: ()=>{
		sessionStorage.setItem("loggedIn", true);
		return true;
	},

	session_end: ()=>{
		sessionStorage.removeItem("loggedIn");
	}
}

class Task{
	constructor(id, name, date,time, priority, status){
		this.id = id;
		this.name = name;
		this.date = date;
		this.time = time;
		this.priority = priority;
		this.status = status;
	};

	//retrieve tasks from localStorage 
	storedData = JSON.parse(localStorage.getItem("tasks"));

	save_task(){
		if(this.storedData.hasOwnProperty(id)){
			this.storedData[id][name] = name;
			this.storedData[id][date] = date;
			this.storedData[id][time] = time;
			this.storedData[id][priority] = priority;
			this.storedData[id][status] = status;
		}else{
			this.id[name] = name;
			this.id[date] = date;
			this.id[time] = time;
			this.id[priority] = priority;
			this.id[status] = status;
			this.storedData[id] = this.id;
		}

		if(localStorage.setItem("tasks", JSON.stringify(this.storedData))){
			return "Task saved successfully";
		}else{
			return "Could not save task";
		}
	}
}


class User{
	constructor(lname, fname, sex, uname, password, bio, image){
		this.surname = lname;
		this.otherNames = fname;
		this.sex = sex;
		this.username = unamme;
		this.password = this.encrypt(password);
		this.bio = bio;
		this.image = image;
	}

	//add user to local storage
	save_user(id){
		//retrieve users from local storage
		let users = JSON.parse(localStorage.getItem("users"));
		users[id].lastName = this.surname;
		users[id].otherNames = this.otherNames;
		users[id].sex = this.sex;
		users[id].username = this.username;
		users[id].password = this.password;
		users[id].bio = this.bio;
		users[id].image  = image;

		if(localStorage.setItem("users", JSON.stringify(users))){
			return "User sucessfully saved";
		}else{
			return "Could not save user";
		}
		
	}
}

const utils = {
	encrypt: (arg)=>{
		//encrypt user password
		let result ="";
		let even="", odd="";
		const v= ["a","e","i", "o", "u"];
		let length = arg.length;
			for(let i =0; i<length; i++){
				if(i%2==0){
					if(!v.includes(arg[i])){
						even += arg[i]+ v[Math.floor(Math.random()*4)];
	                }else{
						even += arg[i];
	                }
	            }else{
					if(!v.includes(arg[i])){
						odd += arg[i]+ v[Math.floor(Math.random()*4)];
	                }else{
						odd += arg[i];
	                }
	            }	
	        }
		result = even + odd;
		return result;
	},

	decrypt: (arg)=>{
		// decrypt user password
	},

	get_user: (id)=>{
		//retrieves a specific user from local storage
		let storage = JSON.parse(localStorage.getItem("users"));
		return  storage[id];
	},

	delete_user: (id)=>{
		// deletes a specific user from local storage
		let storage = JSON.parse(localStorage.getItem("users")); //retrive all users from local storage
		delete  storage[id]; // delete specific users with the parameter id provided

		if(localStorage.setItem("users", JSON.stringify(storage))){
			return "User deleted successfully";
		}else{
			return "Could not delete user";
		}

	},

	retrieve_task: (id)=>{
		let received = JSON.parse(localStorage.getItem("tasks"));
		return received[id];
	},

	delete_task: (id)=>{
		let getStorage = received = JSON.parse(localStorage.getItem("tasks"));
		delete getStorage[id];
		if(localStorage.setItem("tasks",JSON.stringify(storedData))){
			return "Task successfully deleted";
		}else{
			return "Could not delete tasks";
		}
	},

	toggleDisplay: (elem, klass)=>{
		elem.classList.toggle(klass);
	},

	getAllTasks: ()=>{
		return JSON.parse(localStorage.getItem("task"));
	}
};


 
//export model classes, objects and methods for use in other scripts
export{session, Task, User, utils};
