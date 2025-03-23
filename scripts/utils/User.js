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

export async function storeHashPW(user,password){
  hashSHA256Sync(password).then((hashedhPW)=>{
    user.password=hashedhPW;
    localStorage.setItem(user.email,JSON.stringify(user));
  });
}

export async function convertToHashAndLogin(user,password){
  hashSHA256Sync(password).then((hashedPW)=>{
    if(hashedPW===user.password){
      sessionStorage.setItem('login-status','successfull');
    } else {
      sessionStorage.setItem('login-status','unsuccessfull');
    }
  })
}

export class User{
  name;
  email;
  password;
  constructor(name,email,password){
    this.name=name;
    this.email=email;
    this.password='not hashed yet';
  }
}