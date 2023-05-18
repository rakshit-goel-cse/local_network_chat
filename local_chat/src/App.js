import React, { useEffect } from 'react';
import ChatBox from './chatBox';
import AddMsg from './addMessage';
import axios from 'axios';
import Login from './login/login';

function App() {
  const [chatData,setChatData]=React.useState([]);
  const [userName,setUserNam]=React.useState("");
//  const bc= new BroadcastChannel("chatBoox");
//  bc.addEventListener("message", e=>{
//    setChatData([...chatData,e.data]);
//    console.log("msg from broad- "+e);
//  })

//set username from cookies
useEffect(()=>{
  console.log("setuserloc")
  localStorage.setItem("user",JSON.stringify(userName));
},[userName]);

//get data from backend every second
React.useEffect(() => {
  axios.get("http://192.168.29.231:8000/data").then((response) => {
//    console.log("axios.get on launch",response.data)
    setChatData(response.data)
  });
}, [

  setInterval(()=>{
    return 
  },1000)
]); 

//set data at backend when adding text
  const addChat=async(msg)=>{
    //setChatData([...chatData,msg]);
//    bc.postMessage(msg);
    console.log("msg- "+msg);
    try{
    await axios.post("http://192.168.29.231:8000/",{
      "user":userName,"msg":msg
    }).then((response)=>{
      console.log("axios.get",response.data)
      setChatData(response.data)
    })
  }
  catch(e){
    console.log("error in front end axios"+e);
  }
  };


  if (userName === null || userName === "" ) {
    const tempUser = JSON.parse(localStorage.getItem("user"));
    console.log("tempData- ",tempUser)
    if(tempUser && tempUser.length>1){
      setUserNam(tempUser)
    }
    else{
     return(
       <Login setUser={setUserNam}/>
     )
    }
  }
  return (
    <div className='container row left grey lighten-4'>
      <h5 className=' orange teal-text text-darken-1 center'>{userName}</h5>
      <ChatBox chatData={chatData} userName={userName}/>
      <AddMsg addChat={addChat}/>
    </div>
  );
}

export default App;
