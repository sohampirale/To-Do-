

export function getPassword(email){
  const user=JSON.parse(localStorage.getItem(email));
  if(!user){
    console.log('user not found');
    sessionStorage.setItem('login-notification',`<span class="unsucessfull">Email not found</span>`);
    reloadLoginNotification();
    return undefined;
  } else {
    return user.password;
  }
}

export function doesExists(email){
  if(localStorage.getItem(email)){
    return true;
  } else {
    return false;
  }
}