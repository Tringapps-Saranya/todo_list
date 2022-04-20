var loginuser='';
var signupusers='';
var finduser='';
var userdetails='';
$(document).ready(function(){
if(sessionStorage.getItem('login')!= undefined)
{
  loginuser = JSON.parse(sessionStorage.getItem('login'));
  signupuser = JSON.parse(localStorage.getItem('signup'));
  finduser= signupuser.users.find(element => element.email==loginuser.email && element.password==element.password);
  userdetails=finduser;

  for(var i=0; i<userdetails.todolist.length;i++){
        var p= document.createElement("p");
          p.innerText= userdetails.todolist[i].taskname;
          myList.appendChild(p);
          console.log(userdetails.todolist[i].taskname);          
          if(userdetails.todolist[i].completed == "yes"){
            p.className = "l";
            p.classList.toggle('completed');
            
        }
        
}   
save(); 
}
else{
  alert("You have to login first");
  location.href="signin.html";
}    
});

function addTask(){
  var task= document.getElementById("newList").value;
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
     display();
   }

function display(){
  let task=document.getElementById("newList").value
  document.getElementById("newList").value = "";
  var p = document.createElement("p");
  p.innerText= task;
  myList.appendChild(p);
  p.className = "l";
  p.addEventListener('click', function(){
  p.classList.toggle('completed');
  var completedtask = p.innerText;
  console.log(completedtask);
  for(var i=0;i<userdetails.todolist.length;i++){
    if(userdetails.todolist[i].taskname ==  completedtask  && userdetails.todolist[i].completed == "no"){
        userdetails.todolist[i].completed = "yes";
        console.log(userdetails.todolist[i].completed);
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

function empty(){
  userdetails.todolist = [];
  document.getElementById('myList').innerHTML='';
  save();
  //alert("deleted all");
}
function clearComplete(){
  var elements = document.querySelectorAll(".completed");
  for(var x of elements){
      x.remove();
  }
   var filtertask = userdetails.todolist.filter(finishtask => finishtask.completed == 'no');
   userdetails.todolist = filtertask;
   save();
}
