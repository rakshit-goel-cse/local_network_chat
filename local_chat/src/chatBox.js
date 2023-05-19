import React from "react";

export default function ChatBox(props){

    return(
    <div style={{position:"fixed", height:"70%", overflow:"auto",scrollBehavior:"smooth",width:"80%"}}
    className="z-depth-1 ">
        {
            props.chatData.map((data)=>
            {   
                if(data.user===props.userName){
                    return <div style={{paddingRight:"1%"}}>
                                <h6 id="chatItem" className="pink-text grey lighten-3 validate" 
                                    style={{textAlign:"right",paddingRight:"1%"}} >
                                <label >{data.user}</label>
                                {" "+data.msg}
                                </h6>
                            </div>
                }
                return <div style={{paddingRight:"1%"}}>
                            <h6 id="chatItem" className="pink-text grey lighten-3 validate" >
                            <label>{data.user}</label>
                            {" "+data.msg}
                            </h6>
                        </div>
            })
        }
    </div>
    )
}