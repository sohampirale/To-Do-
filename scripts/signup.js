import {getPassword,doesExists} from './utils/authentication.js';
import { User,storeHashPW } from './utils/User.js';

const nameElem=document.getElementById('name');
const emailElem=document.getElementById('email');
const passwordElem=document.getElementById('password');
const formElem=document.getElementById('signupForm');
const signupAttempNotificationElem=document.querySelector('.js-signup-notification');
const signupBtnElem=document.querySelector('.js-signup-btn');

let signupNotification='';

loadSignUpNotification();

formElem.addEventListener('keydown',(event)=>{
  if(event.key=='Enter'){
    event.preventDefault();
    signup();
  }
})

signupBtnElem.addEventListener('click',()=>{
  event.preventDefault();
  signup();
})

function loadSignUpNotification(){
  signupNotification=sessionStorage.getItem('signup-notification');
  if(!signupNotification){
    signupNotification='';
    sessionStorage.setItem('signup-notificaiton',signupNotification);
  }
  signupAttempNotificationElem.innerHTML=signupNotification;
}

function signup(){
  console.log('inside signup()');

  if(doesExists(emailElem.value)){
    sessionStorage.setItem('signup-notification',`Email Already Exists`);
    loadSignUpNotification();
    return;
  }

  let password=passwordElem.value;
  let email=emailElem.value;
  let name=nameElem.value;

  if(email.length==0){
    emailElem.focus();
    return;
  }

  if(name.length==0){
    nameElem.focus();
    return;
  }
  
  if(password.length==0){
    passwordElem.focus();
    return;
  }

  let newUser=new User(name,email,password);

  console.log('calling storeHashPW()');
  
  sessionStorage.setItem('signup-notification',`<span class="in-progress">In Progress...</span>`);
  loadSignUpNotification();

  storeHashPW(newUser,password,signupSuccessful);

}

function signupSuccessful(email){
  
  sessionStorage.setItem('signup-notification',`<span class="successfull"> Sign Up Successfull...redirecting in 2 sec</span>`);
  loadSignUpNotification();

  setTimeout(()=>{
    localStorage.setItem('logged-in-user',email);
    sessionStorage.removeItem('signup-notification');
    window.location.href="app/tasks.html";
  },2000);
}