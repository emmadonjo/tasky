//main site script
//Author: Emmanuel Joshua

let mobileBtn = document.querySelector(".nav-btn");
let nav = document.querySelector("nav");
const filterBtn = document.querySelector("#filter");
const sortBtn = document.querySelector("#sort");
const taskEditBtn = document.querySelectorAll(".task-edit");
let taskDeleteBtn = document.querySelectorAll(".task-delete");
const taskWrap = document.querySelector(".task-wrap");
// const model = new Data();



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


const fetchPage = (url)=>{
    //fetches the contents in the url
    //updates the DOM with the contents
    //@param url string - resource location
    let wrapper = document.querySelector("#root");
    fetch(url)
    .then(response=>{
        return response.text();
    })
    .then(res=>{
        wrapper.innerHTML= res;
    })
    .catch(e=>{
        console.log("An error occured: " + e);
    });
    
};


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
    let script = document.createElement("script");

    if(e.target.nodeName == "LI"){
        page = e.target.className;
        
    }else if(e.target.nodeName == "I"){
        page = e.target.parentNode.className;
    }
    switch(page){
        case "add":
            pageTitle.textContent = " Add Task";
            fetchPage("./views/" + page + ".html");
            script.src ="./assets/js/tasks.js";
            document.body.appendChild(script);
            console.log(script.src);
            break;
        case "tasks":
            pageTitle.textContent = " All Tasks";
            fetchPage("./views/" + page + ".html");
            script.src ="./assets/js/tasks.js";
            document.body.appendChild(script);
            console.log(script.src);
            break;
        default:
            pageTitle.textContent = " Dashboard";
            fetchPage("./views/" + page + ".html");
    }
    
});