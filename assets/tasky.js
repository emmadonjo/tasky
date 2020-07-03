/*
This contains the main scripts for the app

author: Emmanuel Joshua;
version: 1.0.0;
date created: 1st July, 2020;
name: tasky.js;

*/

(function (){
	"use strict";

	//define global variables
	let homeLink = document.querySelector(".top-header");
	let showYear = document.querySelector("#current-year");



	//show current on footer
	showYear.textContent = new Date().getFullYear();

	// redirects to home page
	homeLink.onclick = function(){
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
			i.setAttribute("class", "fas fa-sync");
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