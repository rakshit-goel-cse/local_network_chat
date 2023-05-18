import React, { useEffect } from 'react'

export default function Login(props){
    let [userName,setName]=React.useState("");
    const change=(e)=>{
        //e.preventdefault();
        setName(e.target.value);
    }

    React.useEffect(()=>{
        const buto=document.getElementById("submitButton")
        if(userName.length<1){
            buto.className='light-green accent-3 waves-effect waves-dark disabled btn black-text';
        }
        else{
            buto.className='right light-green accent-3 waves-effect waves-dark btn black-text';
        }
    },[userName]);

    const submitt=()=>{
        console.log("user- ",userName)
        
        if(userName===""){
            return
        }
        props.setUser(userName);
    }

    //const textAreaElement=document.getElementById("mainDiv")
    
    /*if(null!=textAreaElement){
       // console.log(textAreaElement)
    textAreaElement.addEventListener("keyup",(event)=>{
        event.preventDefault();
       // console.log(event.key)
        if(event.key === 'Enter'){
            document.getElementById("submitButton").click()
        }
    })
    }*/

    return(
        <div id="mainDiv" 
        style={{containerType:"box", position: 'absolute', left: '50%', top: '50%', 
        transform: 'translate(-50%, -50%)',padding:'2%'}}
         className='z-depth-4 orange lighten-2' >
            <label className='black-text text-darken-4'>User Name</label>
            <input id="userName" type='Text' onChange={change} ></input>
            <label id="submitButton" type='submit' onClick={submitt}
            >Log In</label>
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