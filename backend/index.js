


const express = require("express");
const cors= require("cors")
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const data=[];

app.post("/",async(req,res)=>{
    const {msg}=req.body
    if(null!=msg && msg!=''){
        data.push(msg)
        console.log(msg)
        res.send(data)
    }
    else{
        console.log("empty input",data)
    }
})
app.get("/data",(req,res)=>{
//    console.log("get data")
   res.send(data)
})

//app.put("/",msg)

app.listen(8000,()=>{
    console.log("port connected")
})


