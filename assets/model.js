const session = {
	function session_start(){
		sessionStorage.setItem("loggedIn", true);
		return true;
	},

	function session_end(){
		sessionStorage.removeItem("loggedIn", true);
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
	}

	save_task(){

	}

	retrieve_task(){

	}

}

class AllTasks{
	sort_tasks(prop=name, order=asc){

	}

	filter_tasks(name, date, priority, status){
		
	}
}

class User{
	constructor(lname, fname, sex, uname, password, bio, image){
		this.surname = lname;
		this.otherNames = fname;
		this.sex = sex;
		this.username = unamme;
		this.password =password;
		this.bio = bio;
		this.image = image;
	}

	save_user(id){

	}

	get_user(id){

	}

	delete_user(id){

	}
}

export{session, Task, User, AllTasks};
