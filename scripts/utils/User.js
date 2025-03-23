async function hashSHA256Sync(text) {
  // Convert text to bytes
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // Wait for the hash to be computed
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert the hash to a hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  return hashHex;
}

export async function storeHashPW(user,password,successfulSignup){
  console.log('inside storeHashPW()');
  
  hashSHA256Sync(password).then((hashedhPW)=>{
    console.log('hashing completed');
    user.password=hashedhPW;
    localStorage.setItem(user.email,JSON.stringify(user));
    successfulSignup(user.email);
  });
}

export async function convertToHashAndLogin(user,password,successfulLogin,unsuccessfullLogin){
  console.log('inside convertToHashAndLogin()');
  
  hashSHA256Sync(password).then((hashedPW)=>{
    console.log('hashing complete');
    if(hashedPW===user.password){
      successfulLogin(user.email);
    } else {
      unsuccessfullLogin();
    }
  })
}

export class User{
  name;
  email;
  password;
  taskId=1;
  // completedTaskId;
  tasks={};
  completedTasks={};
  
  constructor(name,email,password){
    this.name=name;
    this.email=email;
    this.password='not hashed yet';
  }
}