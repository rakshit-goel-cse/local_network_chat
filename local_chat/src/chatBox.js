import React, { useState, useRef, useEffect } from "react";

export default function ChatBox(props){
    const [show, setShow]=useState()
    const [x, setx]=useState(0)
    const [y, sety]=useState(0)
    let btnRef=useRef()
    let endRef=useRef()

    //show delete option
    const Menu=({id,x,y,deleteChat})=>{
        //console.log(x,y)
        return(
            <div id={id} style={{top:"${y}px", left:"${x}px"}} onClick={()=>{deleteChat(id.substring(1))}}
            className="red white-text waves-effect waves-green btn-small" ref={btnRef}>Delete</div>
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

    /*useEffect(()=>{
        endRef.
    })*/

    useEffect(()=>{
        let handler=(e)=>{             
            if(btnRef!=undefined && btnRef.current!=undefined && btnRef.current.id!=null 
                && e.target!=undefined && e.target.id!=undefined &&
                btnRef.current.id != e.target.id){
                setShow()
            }
        }
        document.addEventListener('mousedown',handler)
    })

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
      }
      
      useEffect(()=>{
        scrollToBottom()
      },[props.chatData])

    return(
    <div style={{position:"fixed", height:"70%", overflow:"auto",scrollBehavior:"smooth",width:"75%"}}
    className="z-depth-1 ">
        {      
            props.chatData.map((data)=>
            {
                if(data.user===props.userName){
                    return (<div key={'div'+data.id} id={'div'+data.id} style={{paddingRight:"1%"}}>
                                 {show==data.id && <Menu id={'M'+data.id} x={x} y={y} deleteChat={props.deleteChat}/>}
                                <h6 id={data.id} className="pink-text grey lighten-3 validate" 
                                    style={{textAlign:"right",paddingRight:"1%"}} onContextMenu={Divevent}>       
                                <label id={'label'+data.id} >{data.user}</label>
                                {" "+data.msg}
                                </h6>
                            </div>)
                }
                return (<div key={'div'+data.id} id={'div'+data.id} style={{paddingRight:"1%"}}>
                            {/*show==data.id && <Menu id={data.id} x={x} y={y} deleteChat={props.deleteChat}/>*/}
                            <h6 id={data.id} className="pink-text grey lighten-3 validate" onContextMenu={Divevent} >
                            <label id={'label'+data.id}>{data.user}</label>
                            {" "+data.msg}
                            </h6>
                        </div>)
            })
        }
        <div ref={endRef}></div>
    </div>
    )
}