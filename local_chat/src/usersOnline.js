import React from 'react'

export default function ActiveUsers(props){

    return(
        <div style={{position:"absolute",right:"1%",top:"1%" ,paddingRight:".4%", paddingLeft:"1%"}} className='green lighten-3'>
            <h5 className='white-text' style={{alignSelf:"top"}}>Active Users</h5>
            {props.users.map((user)=>{
                return(
                    <h6>{user}</h6>
                )
            })}
        </div>
    )
}
