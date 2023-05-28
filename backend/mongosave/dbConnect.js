import UserSchema from "./schema.js";
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
await mongoose.connect('mongodb://127.0.0.1:27017/local_chat')
    .catch((err)=>{console.log("Connectted to DB ",err);})
    

const chat_Data = new mongoose.model("chat_Data",UserSchema(mongoose));

/*const dada={
    id:1,
    name:"nnnnn",
    data:"jhvgvkjhvkjh"
}*/

export const getData=async()=>{
    let data
    await chat_Data.find({}).then(chat_Data=>{
            //console.log("db connection user data- ",chat_Data);
        data=JSON.parse(JSON.stringify(chat_Data));
    }).catch((err)=>{
        console.log(err)
    }) 
    //console.log("db data- ",data);
    return data;
    //addNewData(); 
};

export const addNewData = async(dada) => {
    let chatData = new chat_Data(dada);

    await chatData.save().then(chatData => {
         (chatData);
    });
    
};

export const deleteChat = async(id) => {
    //console.log("delete call for id ",id)
    await chat_Data.findByIdAndDelete(id).then().catch(err=>console.log(err))
}



