const express= require('express');
const {fetchUser}= require('../controllers/loginSignup')
const {cartItem}= require('../controllers/transectionController')

const router=express.Router()

router.post('/getcart',fetchUser,cartItem)
module.exports=router

