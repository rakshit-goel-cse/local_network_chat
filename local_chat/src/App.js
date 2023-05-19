import React, { useEffect } from "react";
import ChatBox from "./chatBox";
import AddMsg from "./addMessage";
import axios from "axios";
import Login from "./login/login";

function App() {
  
  const [userName, setUserNam] = React.useState("");
  let flag=true;

  //  const bc= new BroadcastChannel("chatBoox");
  //  bc.addEventListener("message", e=>{
  //    setChatData([...chatData,e.data]);
  //    console.log("msg from broad- "+e);
  //  })

  //set username from cookies
  useEffect(() => {
    console.log("setuserloc");
    localStorage.setItem("user", JSON.stringify(userName));
  }, [userName]);

  const logout = async() => {
    localStorage.removeItem("user");
    setUserNam("");
    try {
      await axios
        .post("http://192.168.29.231:8000/logout", {
          user: userName
        });
    } catch (e) {
      console.log("error in front end axios" + e);
    }
    
  };

  

  if (userName === null || userName === "") {
    const tempUser = JSON.parse(localStorage.getItem("user"));
    //console.log("tempData- ",tempUser)
    if (tempUser && tempUser.length > 1) {
      setUserNam(tempUser);
    } else {
      return <Login setUser={setUserNam} />;
    }
  } else {
    //get data from backend every second
    return(
    <MainLaunch userName={userName} logout={logout}/>
    )
  }
}

function MainLaunch({userName,logout}){
  const [chatData, setChatData] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://192.168.29.231:8000/data").then((response) => {
      //    console.log("axios.get on launch",response.data)
      setChatData(response.data);
    });
  }, [
    setInterval(() => {
      return
    }, 1000)
  ]);

  //set data at backend when adding text
  const addChat = async (msg) => {
    console.log("msg- " + msg);
    try {
      await axios
        .post("http://192.168.29.231:8000/", {
          user: userName,
          msg: msg,
        })
        .then((response) => {
          console.log("axios.get", response.data);
          setChatData(response.data);
        });
    } catch (e) {
      console.log("error in front end axios while adding chat" + e);
    }
  };

   //delete data at backend
   const deleteChat = async (id) => {
    console.log("id- " + id);
    try {
      await axios
        .post("http://192.168.29.231:8000/delete", {
          id:id
        })
        .then((response) => {
          console.log("axios.get", response.data);
          setChatData(response.data);
        });
    } catch (e) {
      console.log("error in front end axios while deleting" + e);
    }
  };

  return (
    <div className="container row left grey lighten-4">
      <h5 className=" orange teal-text text-darken-2 ">
        {userName}
        <label
          className=" waves-effect btn-small right red white-text"
          onClick={logout}
        >
          LogOut
        </label>
      </h5>
      <ChatBox chatData={chatData} userName={userName} />
      <AddMsg addChat={addChat} />
    </div>
  );
}

export default App;
