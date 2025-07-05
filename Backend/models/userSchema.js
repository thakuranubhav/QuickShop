const mongoose= require('mongoose');

const userSchema= new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now,
    }

},{timestamps:true});

const userModel=mongoose.model('user',userSchema);
module.exports=userModel;
