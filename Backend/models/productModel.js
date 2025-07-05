const mongoose= require('mongoose')

const productSchema= new mongoose.Schema({
    id:{
        type:Number,
        required:[true,'id is required ']
    },
    name:{
        type:String,
        required:[true,'name is required']
    },
    image:{
        type:String,
        required:[true,'image is required']
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true
    }


},{timestamps:true});

// export
const productModel=mongoose.model('product',productSchema)
module.exports=productModel