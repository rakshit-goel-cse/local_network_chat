


const express = require("express");
const cors= require("cors")
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const data=[];

app.post("/",async(req,res)=>{
    //console.log("data ",req.body.user)
    const dataMap=req.body
    //const msg=dataMap.get("msg")

    if(null!=dataMap){
        data.push(dataMap)
        console.log(dataMap)
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


