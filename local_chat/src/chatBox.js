import React from "react";

export default function ChatBox(props){

    return(
    <div>
        {
            props.chatData.map((msg)=>
            {
                return <h6>{msg}</h6>
            })
        }
    </div>
    )
}