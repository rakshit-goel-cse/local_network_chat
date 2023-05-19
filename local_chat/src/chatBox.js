import React, { useState } from "react";

export default function ChatBox(props){
    const [show, setShow]=useState()
    const [x, setx]=useState(0)
    const [y, sety]=useState(0)

    //show delete option
    const Menu=({id,x,y,deleteChat})=>{
        console.log(x,y)
        return(
            <div id={"M"+id} style={{top:"${y}px", left:"${x}px"}} onClick={()=>{deleteChat(id)}}
            className="red white-text waves-effect waves-green btn-small">Delete</div>
        )
    }

    //capture right click event
    const Divevent = (e) => {
        e.preventDefault();
        const textAreaElement=document.getElementById("M"+e.currentTarget.id)
        if(show==e.currentTarget.id ){
            setShow()
        }
        else{
            setShow(e.currentTarget.id);
        }
            //let clientx=e.currentTarget.getAttribute("index")
        //console.log(clientx)
        //setx(e.pagex)
        //sety(e.pagey)
    }

    return(
    <div style={{position:"fixed", height:"70%", overflow:"auto",scrollBehavior:"smooth",width:"80%"}}
    className="z-depth-1 ">
        {      
            props.chatData.map((data)=>
            {
                if(data.user===props.userName){
                    return (<div style={{paddingRight:"1%"}}>
                                 {show==data.id && <Menu id={data.id} x={x} y={y} deleteChat={props.deleteChat}/>}
                                <h6 id={data.id} className="pink-text grey lighten-3 validate" 
                                    style={{textAlign:"right",paddingRight:"1%"}} onContextMenu={Divevent}>       
                                <label >{data.user}</label>
                                {" "+data.msg}
                                </h6>
                            </div>)
                }
                return (<div style={{paddingRight:"1%"}}>
                            {/*show==data.id && <Menu id={data.id} x={x} y={y} deleteChat={props.deleteChat}/>*/}
                            <h6 id={data.id} className="pink-text grey lighten-3 validate" onContextMenu={Divevent} >
                            <label>{data.user}</label>
                            {" "+data.msg}
                            </h6>
                        </div>)
            })
        }
    </div>
    )
}