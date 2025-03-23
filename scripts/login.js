import { doesExists, getPassword } from "./utils/authentication.js";
import { convertToHashAndLogin } from "./utils/User.js";

const emailElem=document.getElementById('email');
const passwordElem=document.getElementById('password');
const loginBtnElem=document.querySelector('.js-login-btn');
const loginAttemptNotificaitonElem=document.querySelector('.js-login-attempt-notification');

let loginNotification=``;

reloadLoginNotification();

function reloadLoginNotification(){
  loginNotification=getLoginNotification();
  loginAttemptNotificaitonElem.innerHTML=loginNotification;
}

function getLoginNotification(){
  let notification=sessionStorage.getItem('login-notification');
  if(!notification){
    notification=``;
    sessionStorage.setItem('login-notification',notification);
  }
  return notification;
}

loginBtnElem.addEventListener('click',()=>{
  login();
})

emailElem.addEventListener('keydown',(event)=>{
  if(event.key=='Enter'){
    event.preventDefault();
    passwordElem.focus();
  }
})

passwordElem.addEventListener('keydown',(event)=>{
  if(event.key=='Enter'){
    event.preventDefault();
    login();
  }
})

passwordElem.addEventListener('keydown',(event)=>{
  if(event.key=='Enter'){
    console.log('submitting login info');
    loginBtnElem.click();
  }
})

function login(){

  event.preventDefault();
  
  if(!doesExists(emailElem.value)){
    sessionStorage.setItem('login-notification',`<span>Email not found</span>`);
    reloadLoginNotification();
    return;
  }

  let email=emailElem.value;
  let password=passwordElem.value;

  let user=JSON.parse(localStorage.getItem(emailElem.value));
  
  sessionStorage.setItem('login-notification','<span class="in-progress">In Progress...</span>');

  reloadLoginNotification();

  convertToHashAndLogin(user,password,successfulLogin,unsuccessfullLogin); //successfulLogin and unsuccessfulLogin are callBacks

}

function successfulLogin(email){

  sessionStorage.setItem('login-notification',`<span class="successfull">Login Successfull</span>`);
  reloadLoginNotification();

  localStorage.setItem('logged-in-user',email);

  setTimeout(()=>{
    sessionStorage.removeItem('login-notification');;
    reloadLoginNotification();

    window.location.href="app/tasks.html";
  },1000);
}

function unsuccessfullLogin(){
  sessionStorage.setItem('login-notification',`<span class="unsuccessfull">Incorrect Password</span>`);
  reloadLoginNotification();
}