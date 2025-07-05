const userModel= require('../models/userSchema');
const jwt= require('jsonwebtoken');


const loginController= async (req,res)=>{

    try{

        let user =await userModel.findOne({
            email:req.body.email,
        })

        if(user){
            const passCompare=(req.body.password === user.password);
            if(passCompare){
                const data={
                    user:{
                        id:user.id
                    }
                }
                const token= jwt.sign(data,'secret_ecom');
                res.json({
                    success:true,
                    token
                })
            }
            else{
                res.json({success:false,errors:"Wrong password "})
            }
        }
        else{
            res.status(400).json({
                success:false,
                errors:"email id not found"
            })
        }

    

    } catch(error){
        res.status(500).json({
            error:`unable to add product ${error}`
        })
        console.log(error)

    }



}

const signupController= async (req,res)=>{
    try{
        let check= await userModel.findOne({email:req.body.email});

        if(check){
            return res.status(400).json({
                success:false,
                errors:"existing user found,user already exist"
            })
        }

            let cart={};

            for(let index=0; index<300;index++){
                cart[index]=0;

            }

            const user =new userModel({
                name:req.body.username,
                email:req.body.email,
                password:req.body.password,
                cartData:cart
            })

            await user.save();

            const data={
                user:{
                    id:user.id
                }
            }

            const token = jwt.sign(data,'');
            res.json({success:true,token})
      
    } catch(error){
        res.status(500).json({
            error:`unable to add product ${error}`
        })
        console.log(error)

    }
}

 //creating middleware to fetch User
 const fetchUser= async (req,res,next)=>{
    const token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"please authenticate using valid token"})
    }
    else{
        try{

            const data=jwt.verify(token,'secret_ecom');
            req.user=data.user;
            next();

        } catch(error){
            res.status(401).send({errors:"please authenticate using a valid token"})

        }
    }
 }

 //

module.exports={loginController,signupController,fetchUser}