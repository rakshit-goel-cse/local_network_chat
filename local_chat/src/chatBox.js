import React from "react";

export default function ChatBox(props){

    return(
    <div style={{position:"fixed", height:"70%", overflow:"auto",scrollBehavior:"smooth",width:"80%"}}
    className="z-depth-1 ">
        {
            props.chatData.map((msg)=>
            {
                return <><h6 id="chatItem" className="pink-text grey lighten-3 validate">
                <label for='chatItem'>{props.userName}</label>
                {" "+msg}
                </h6>
                </>
            })
        }
    </div>
    )
}