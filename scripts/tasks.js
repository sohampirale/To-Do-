const newTaskElem=document.getElementById('new-task');
const notificationElem=document.querySelector('.notification');
const logoutBtnElem=document.getElementById('logout');
const email=localStorage.getItem('logged-in-user');
const welcomeMsgElem=document.getElementById('welcome-message');
const userTasksListElem=document.getElementById('user-task-list');
const headlineUserTasksElem=document.querySelector('.js-headline-user-tasks');
const addTaskBtnElem=document.getElementById('add-task-btn');
let user;

if(!email){
  alert('You need to log in first to access this page');
  window.location.href='../login.html';
} else {
  user=JSON.parse(localStorage.getItem(email));
  welcomeMsgElem.innerHTML=`Welcome, <span class="name">${user.name}</span>`;
  sessionStorage.removeItem('login-notification');
  sessionStorage.removeItem('signup-notification');
  renderAllTasks();
  addEventListernsToAllCheckbox();
}

addTaskBtnElem.addEventListener('click',()=>{
  addNewTask();
});

logoutBtnElem.addEventListener('click',()=>{
  logout();
})

newTaskElem.addEventListener('keydown',(event)=>{
  if(event.key=='Enter'){
    addNewTask();
  }
})

function addEventListernsToAllCheckbox(){ 
  if(Object.keys(user.tasks).length==0){
    return;
  }

  const allTaskInputBoxes=document.querySelectorAll('.task-checkbox');
  allTaskInputBoxes.forEach((inputBnt)=>{
    addEventListenerToOneCheckbox(inputBnt);
  })
}

function addEventListenerToOneCheckbox(inputBtn){
  console.log('adding event listenr to : '+JSON.stringify(inputBtn));
  
  inputBtn.addEventListener('click',()=>{
    const nearestTaskContainer=inputBtn.closest('.task-container');
    completeTask(nearestTaskContainer);
  })
}

function renderAllTasks(){
  console.log('user.tasks : '+JSON.stringify(user.tasks));

  if(Object.keys(user.tasks).length==0){
    console.log('No tasks yet');
    headlineUserTasksElem.innerHTML=`No Tasks Yet!`;
    return;
  } else {
    headlineUserTasksElem.innerHTML=`Your Tasks`;
  }
 
  let allTasks='';
  for(let taskId in user.tasks){
    allTasks+=`
    <li id=${taskId} class="task-container">  
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${user.tasks[taskId]}</span>
    </li>
    `;
  }

  userTasksListElem.innerHTML+=allTasks;
  
}

function completeTask(taskContainer){
  console.log('completed a task : '+JSON.stringify(taskContainer));
  
  const task=taskContainer.querySelector('.task-text');
  user.completedTasks[taskContainer.id]=task.innerHTML;
  delete user.tasks[taskContainer.id];
  localStorage.setItem(email,JSON.stringify(user));
  taskContainer.remove();
}

function doesTaskExists(newTask){
  for(let taskId in user.tasks){
    if(user.tasks[taskId]==newTask){
      return true;
    }
  }
  return false;
}

function addNewTask(){
  console.log('inside addNewTask()');
  
  let newTask=newTaskElem.value;
  if(newTask.length==0){
    notificationElem.innerHTML=`<span class="unsuccessfull">Task Cannot be Empty</span>`;
    return;
  } else {
    notificationElem.innerHTML='';
  }

  if(doesTaskExists(newTask)){
    notificationElem.innerHTML=`<span class="unsuccessfull">Task Already Present</span>`;
    return;
  }

  user.tasks[(user.taskId)]=newTask;
  
  let newTaskHTML=`
    <li id=${user.taskId} class="task-container">  
        <input type="checkbox" class="task-checkbox">
        <span class="task-text">${user.tasks[user.taskId]}</span>
    </li>`;

    userTasksListElem.innerHTML+=newTaskHTML;


    const inputBtn=document.getElementById(user.taskId).querySelector('.task-checkbox');
    console.log('adding event listenr to '+newTask);
    
    addEventListenerToOneCheckbox(inputBtn);

    user.taskId++;
    notificationElem.innerHTML=`<span class="successfull">Task Added Successfully</span>`;
    localStorage.setItem(email,JSON.stringify(user));
    newTaskElem.value='';
}

function logout(){
  localStorage.removeItem('logged-in-user');
  window.location.href="../login.html";
}