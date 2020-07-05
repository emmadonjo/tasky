/*
This contains the main scripts for the app

author: Emmanuel Joshua;
version: 1.0.0;
date created: 1st July, 2020;
name: tasky.js;

*/

(function (){
	"use strict";
	const tasks ={
	//stores each task before pushing to localStorage
	};

	const globalVar = {
		//variables to be used globally 
		//avoids cluttering the global space

		homeLink: document.querySelector(".top-header"),

		showYear: document.querySelector("#current-year")
	};

	const utilsFuncs = {
		//utility functions for frequent operations

		//toggle element display
		toggleDisplay: function(elem, klass){
			elem.classList.toggle(klass);
		},

		encryptPassword: function(password){

		},

		//saves user details to localStorage
		newUser: function(lname, fname, sex, uname, password, bio, image){
			user.lastname = lname;
			user.firstname = fname;
			user.sex = sex;
			user.username = uname;
			user.password = password;
			user.bio = bio;
			user.image = image;

			localStorage.setItem("userDetails", JSON.stringify(user));
		},

		//retrieves user from localStorage

		getUser: function(userName){
			let u = JSON.parse(localStorage.getItem("users"));
			return u[userName]; // returns the details of the specified user
		},
		selectTask: function(){

		}
	};

	



	//show current on footer
	globalVar.showYear.textContent = new Date().getFullYear() +" |";

	// redirects to home page
	globalVar.homeLink.onclick = function(){
		window.location.href = "index.html";
	};
	let nav = document.querySelector(".main-nav ul")
	let li = document.createElement("li");
	let a = document.createElement("a")
	let i = document.createElement("i")
	let span = document.createElement("span");
	
	{
		//adds either a login or logout button
		if(sessionStorage.getItem('loggedIn')){
			//create logout menu
			a.href = "#";
			a.setAttribute("title", "Logout");
			a.id = "logout"
			i.setAttribute("class", "fas fa-power-off");
			span.setAttribute("class", "nav-text");
			span.textContent = "  Logout";
			a.appendChild(i);
			a.appendChild(span);
			li.appendChild(a);
			nav.appendChild(li);

			let logout =document.querySelector("a#logout");
			logout.onclick = function(e){
				e.preventDefault();
				window.location.href= "login.html";
				sessionStorage.removeItem("loggedIn");
			}

		}else{
			//create login menu
			a.href = "login.html";
			a.setAttribute("title", "Login");
			i.setAttribute("class", "fas fa-lock-open");
			span.setAttribute("class", "nav-text");
			span.textContent = "Login";
			a.appendChild(i);
			a.appendChild(span);
			li.appendChild(a);
			nav.appendChild(li);
		}
	}
//display tasks statuses on footer info panel
}());