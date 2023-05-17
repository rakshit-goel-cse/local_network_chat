import React from "react";
import {mainDiv} from "./addMessageStyle";
import "./materialize/css/materialize.css";
export default function AddMsg({addChat}){
    const [msg,setmsg] = React.useState("");

    const onChange=(event)=>{
        setmsg(event.target.value);
    }
    const onClicked=()=>{
        if(msg===''){
            return
        }
        addChat(msg)
        setmsg("");
    }

    const textAreaElement=document.getElementById("msgTextArea")
    if(null!=textAreaElement){
    textAreaElement.addEventListener("keyup",(event)=>{
        event.preventDefault();
        if(event.key === 13){
            document.getElementById("submitButton").click();
        }
    })
    }
    return(
        <div className="container col" style={mainDiv()}>
            <form>
                <input id="msgTextArea" type='text' onChange={onChange} value={msg} 
                className="green darken-1  yellow-text text-accent-2 col s10" placeholder="Type Here"></input>
                
                <button className="btn right" onClick={()=>{onClicked()}}>
                    <i className="material-icon">send</i>
                </button>
            </form>
        </div>
    )
}