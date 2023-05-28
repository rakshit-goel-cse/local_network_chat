import  express  from "express";
import cors from "cors";
import bodyparser from "body-parser";
import { addNewData,getData,deleteChat }from "./mongosave/dbConnect.js";

//const express = require("express");
//const cors= require("cors");

const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use(bodyparser.urlencoded( { extended: true}));
app.use(bodyparser.json() );

cors({ origin : [ "http://192.168.29.231:3000"]})

let data=[];
let users=[];



app.post("/",async(req,res)=>{
    const dataMap=req.body
    if(null!=dataMap){
        //data.push(tempData)
        await addNewData(dataMap);
        //console.log("tempdata ",dataMap)
        data=await getData();   
    }
    else{
        console.log("empty input",data)
    }
})

app.get("/data",async(req,res)=>{
//    console.log("get data")
   //res.send(data)
   //data=await getData();
   res.send({data:data,users:users})
})

//app.put("/",msg)

app.post("/user",async(req,res)=>{
    const userName=req.body.user;
    //console.log("name-- ",userName)
    let flag=true;
    if(userName!=null){
        if(users.length<1){
            console.log("first input user")
            users.push(userName)
            res.send(true)
        }else{
            //console.log("users- ",users)
            users.map((i)=>{
                console.log("mapping user ",i," user input ", userName)
                if(i==userName){
                    flag=false;
                    console.log("false response")
                    res.send(false)
                }
            })
            if(flag){
                users.push(userName)
                //console.log("true response")
                res.send(true)
            }
        }
    }
    else{
        res.send(false)
    }
})

app.post("/logout",async(req,res)=>{
    const dataMap=req.body
    if(null!=dataMap){
        users = users.filter((person)=>{
            return (person !== dataMap.user)
        })
    }
    else{
        console.log("empty input",data)
    }
    res.send("100")
})

app.post("/delete",async(req,res)=>{
    const body=req.body
    console.log(body)
    if(null!=body && null!=body.id){
        let id=body.id
        /*data=data.filter((data)=>{
            return(data.id!=id)
        })*/
        await deleteChat(id);
        data=await getData();
        res.send(data);
    }
    else{
        console.log("delete failed")
    }
})

app.listen(8000,async()=>{
    data=await getData();
    console.log("port connected")
})


