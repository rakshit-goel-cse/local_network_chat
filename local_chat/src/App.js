import React, { useEffect } from "react";
import ChatBox from "./chatBox";
import AddMsg from "./addMessage";
import axios from "axios";
import Login from "./login/login";
import UsersOnline from "./usersOnline";
import notiSound from "./notification/notification_sound.wav";

let timer=null;
let called=false;
function App() {
  const [userName, setUserNam] = React.useState("");
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

  const logout = async () => {
    localStorage.removeItem("user");
    setUserNam("");
    try {
      await axios.post("http://192.168.29.231:8000/logout", {
        user: userName,
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

    return <MainLaunch userName={userName} logout={logout} />;
  }
}

function SetTimmer(chatData,setChatData,users,setUsers){
  return(setInterval(() => {
    try {
      axios.get("http://192.168.29.231:8000/data").then((response) => {
        console.log("axios.get in interval",chatData,chatData.length,response,response.data, response.data.data, response.data.data.length)
        if (users.length != response.data.users.length) {
          setUsers(response.data.users);
        }
        
        if (chatData.length != response.data.data.length) {
          setChatData(response.data.data);
        }
          //console.log("axios.get in interval inside",alertSound)
        /*  if (null != alertSound && null != alertSound.current) {
            //alertSound.current.click();
            //alertSound.current.play();
          }
          setChatData(response.data.data);
          //console.log("axios.get in interval inside 2 ",chatData)
        }*/
      });
    } catch (error) {
      console.log("error in front end axios get time interval" + error);
    }
  }
  , 2000)
  )
}


function MainLaunch({ userName, logout }) {
  const [chatData, setChatData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  let alertSound = React.useRef(null);

  
  React.useEffect(() => {
    try {
      axios.get("http://192.168.29.231:8000/data").then((response) => {
        console.log("axios.get on launch ",response)
        if (response.data.users.length < 1) {
          logout();
        } else {
          let flag = true;
          response.data.users.map((item) => {
            if (item == userName) {
              flag = false;
            }
          });
          if (flag) {
            logout();
          } else {
            if (users.length != response.data.users.length) {
              setUsers(response.data.users);
            }
          }
        }

        if (chatData.length != response.data.data.length) {
          setChatData(response.data.data);
        }
      });
      if(timer){
        clearTimeout(timer)
        timer=SetTimmer(chatData, setChatData, users, setUsers)
      }
      //
    } catch (error) {
      console.log("error in front end get axios" + error);
    }
  }, [
  ]);

  if(!timer){
  timer=SetTimmer(chatData, setChatData , users, setUsers)
}

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
          id: id,
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
      <audio ref={alertSound} src={notiSound} autoPlay={false} muted={true} />
      <UsersOnline key="user" users={users} />

      <h5 className=" orange teal-text text-darken-2 " style={{ width: "80%" }}>
        {userName}
        <label
          className=" waves-effect btn-small right red white-text"
          onClick={logout}
        >
          LogOut
        </label>
      </h5>
      <ChatBox
        key="chatBox"
        chatData={chatData}
        userName={userName}
        deleteChat={deleteChat}
      />
      <AddMsg key="addChat" addChat={addChat} />
    </div>
  );
}

export default App;
