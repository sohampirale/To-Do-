console.log('hi');
let msg=new XMLHttpRequest();

msg.addEventListener('load',()=>{
  console.log('response received');
  console.log(msg.response);
})

msg.open('GET','https://supersimplebackend.dev/hello');
msg.send();

let responseGot=msg.response;

let setIntervalId=setInterval(()=>{ 
  responseGot=msg.response;
  if(responseGot){
    console.log('response recieved : '+responseGot);
    clearInterval(setIntervalId);
  } else {
    console.log('response not yet received');
  }
},100);