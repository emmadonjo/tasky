/*
This contains the main scripts for the app

author: Emmanuel Joshua;
version: 1.0.0;
date created: 1st July, 2020;
name: tasky.js;

*/

(function (){
	"use strict";
	import{Task, Users, session, utils} from "./model.js";

	const bindings = {
		//variables to be used globally within the script
		//avoids cluttering the global space
		homeLink: document.querySelector(".top-header"),
		showYear: document.querySelector("#current-year"),

	};

	



	//show current year on footer
	bindings.showYear.textContent = new Date().getFullYear() +" |";

	// redirects to home page
	bindings.homeLink.onclick = function(){
		window.location.href = "index.html";
	};
	let nav = document.querySelector(".main-nav ul")
	let li = document.createElement("li");
	let a = document.createElement("a")
	let i = document.createElement("i")
	let span = document.createElement("span");
	
	
	{
		//adds either a login or logout button to the nav
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


}());