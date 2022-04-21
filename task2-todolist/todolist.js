var loginuser='';
let signupusers='';
var finduser='';
var userdetails='';
$(document).ready(function(){
if(sessionStorage.getItem('login')!= undefined)
{
  loginuser = JSON.parse(sessionStorage.getItem('login'));
  signupusers = JSON.parse(localStorage.getItem('signup'));
  finduser= signupusers.users.find(element => element.email == loginuser.email && element.password == loginuser.password);
  userdetails=finduser;
  
  //To display the task when the page reloads
  
  for(var i=0; i<userdetails.todolist.length;i++){
    var p = document.createElement("p");
    p.innerText= userdetails.todolist[i].taskname;
    myList.appendChild(p);
    p.className = "l";
                 
          if(userdetails.todolist[i].completed == "yes"){
            p.classList.toggle('completed');
            
        }
        display(p)
}   
save(); 
}
else{
  alert("You have to login first");
  location.href="signin.html";
}    
});

// add the task in the localstorage

function addTask(){
  let task= document.getElementById("newList").value;
  if(task.length==0 && task.length==''){
      alert('Please enter task name');
  }
     console.log(1);
     let addtask={
       "taskname": task,
       "completed": "no"
     }
     console.log(userdetails);
     userdetails.todolist.push(addtask);
     document.getElementById("newList").value = "";
     var p = document.createElement("p");
     p.innerText= task;
     myList.appendChild(p);
     p.className = "l";
     display(p);
   }

// display the tasks on the page

function display(p){
  p.addEventListener('click', function(){
  p.classList.toggle('completed');
  var completedtask = p.innerText;
  console.log(completedtask);
  for(list of userdetails.todolist){
    if(list.taskname == completedtask){
      if(list.completed == "no"){
        list.completed = "yes";
      }else{
        list.completed = "no";
      }
      save();
      break;
    }
  }
  });
  save(); 
}

function logout(){
  sessionStorage.clear();
  location.href="signin.html";
}

// After performed some functions,again store the changes on localstorage

function save(){
  loginuser = JSON.parse(sessionStorage.getItem('login'));
  signupuser = JSON.parse(localStorage.getItem('signup'));
  for(let list of signupuser.users){
    if(list.email == loginuser.email && list.password == loginuser.password)
       list.todolist= userdetails.todolist;
  }
  localStorage['signup']=JSON.stringify(signupuser);
  console.log(signupuser);
}

// It clear the list of tasks

function empty(){
  userdetails.todolist = [];
  document.getElementById('myList').innerHTML='';
  save();
}

// It clear the completed tasks

function clearComplete(){
  var elements = document.querySelectorAll(".completed");
  for(var x of elements){
      x.remove();
  }
   var filtertask = userdetails.todolist.filter(finishtask => finishtask.completed == 'no');
   userdetails.todolist = filtertask;
   save();
}
