import React from 'react';
import ChatBox from './chatBox';
import AddMsg from './addMessage';
import axios from 'axios';

function App() {
  const [chatData,setChatData]=React.useState([]);
  const [userName,setUserNam]=React.useState('aa');
//  const bc= new BroadcastChannel("chatBoox");
//  bc.addEventListener("message", e=>{
//    setChatData([...chatData,e.data]);
//    console.log("msg from broad- "+e);
//  })
if(userName==='' || null===userName){
 let user= prompt('Please Enter your Name')
  if (user === null || user === "") {
    console.log("User cancelled the prompt.");
  }
  else{
    setUserNam(user,()=>{console.log("userName- ",userName)})
    console.log("userName- ",userName)
  }
  console.log(userName)
}

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

  const addChat=async(msg)=>{
    //setChatData([...chatData,msg]);
//    bc.postMessage(msg);
    console.log("msg- "+msg);
    try{
    await axios.post("http://192.168.29.231:8000/",{
      msg
    }).then((response)=>{
      console.log("axios.get",response.data)
      setChatData(response.data)
    })
  }
  catch(e){
    console.log("error in front end axios"+e);
  }
  };
 
  return (
    <div className='container row left grey lighten-4'>
      <h5 className=' orange teal-text text-darken-1 center'>{userName}</h5>
      <ChatBox chatData={chatData} userName={userName}/>
      <AddMsg addChat={addChat}/>
    </div>
  );
}

export default App;
