const express= require('express');
const {addProduct,removeProduct,allProduct,newCollection,popularWomen,addTocart,removefromCart}= require('../controllers/transectionController')
const {fetchUser}=require('../controllers/loginSignup')

//router object 

router=express.Router();

//router
//Post for adding products to the database
router.post('/addproduct',addProduct)

//post for removing products from the database
router.post('/removeproduct',removeProduct)

//getting all products from the database
router.get('/allproducts',allProduct)

//creating endpoints  for newCollections data

router.get('/newcollection',newCollection);

//popular in women
router.get('/popularinwomen',popularWomen)

//for adding cart products in the database
router.post('/addtocart',fetchUser,addTocart)

//endpint for removing cart data
router.post('removefromcart',fetchUser,removefromCart)






//export
module.exports=router