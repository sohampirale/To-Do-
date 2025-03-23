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

  console.log('email you entered is : '+emailElem.value);
  console.log('Password you entered is : '+passwordElem.value);
  
  if(!doesExists(emailElem.value)){
    sessionStorage.setItem('login-notification',`<span>Email not found</span>`);
    reloadLoginNotification();
    return;
  }

  let email=emailElem.value;
  let password=passwordElem.value;

  let user=JSON.parse(localStorage.getItem(emailElem.value));

  
  sessionStorage.setItem('login-notification','In Progress...');
  reloadLoginNotification();

  convertToHashAndLogin(user,password);

  let loginAttempt=sessionStorage.getItem('login-statuc');

  
  let setIntervalLoginAttempId=setInterval(()=>{
    console.log('inside setInterval');
    
    loginAttempt=sessionStorage.getItem('login-status');
    if(loginAttempt){
      clearInterval(setIntervalLoginAttempId);
      if(loginAttempt=='successfull'){
        sessionStorage.setItem('login-notification',`<span>Login Successfull</span>`);
        reloadLoginNotification();
        sessionStorage.removeItem('login-attempt');
        window.location.href="app/tasks.html";
      } else if(loginAttempt=='unsuccessfull'){
        sessionStorage.setItem('login-notification',`<span>Incorrect Password</span>`);
        sessionStorage.removeItem('login-attempt');
        reloadLoginNotification();
      }
    }
  },1000);

}