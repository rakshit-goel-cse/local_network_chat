import React from 'react'

export default function Login(props){
    let [userName,setName]=React.useState("");
     
    const change=(e)=>{
        //e.preventdefault();
        setName(e.target.value);
    }

    const submitt=()=>{
        console.log("user- ",userName)
        if(userName===""){
            return
        }
        props.setUser(userName);
    }
    return(
        <div>
            <label>User Name</label>
            <input type='Text' onChange={change} ></input>
            <button onClick={submitt}>Submit</button>
        </div>
    )
}

/*if(userName==='' || null===userName){
    let user= prompt('Please Enter your Name')
     if (user === null || user === "") {
       console.log("User cancelled the prompt.");
     }
     else{
       setUserNam(user,()=>{console.log("userName- ",userName)})
       console.log("userName- ",userName)
     }
     console.log(userName)
   }*/