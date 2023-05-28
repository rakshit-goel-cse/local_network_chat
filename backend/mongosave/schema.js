

const UserSchema= mongose =>{
    const userSchema = new mongose.Schema({
       
        user: {
            type:String,
            required:true
        },
        msg:{
            type:String,
            required:true
        },
        createdDate:{
            type:Date,
            default:Date.now,
            required:true
        } 
    });
    return userSchema;
} 

export default UserSchema