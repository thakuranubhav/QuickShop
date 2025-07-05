const express= require('express');

const {loginController,signupController}=  require('../controllers/loginSignup');


//router object

router=express.Router();


//post for login
 router.post('/login',loginController);

//post for signup

router.post('/signup',signupController);

module.exports=router


