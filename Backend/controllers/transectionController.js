const productModel= require('../models/productModel');
const userModel= require('../models/userSchema')

const addProduct= async (req,res)=>{
    try{
        let products= await productModel.find({});
        let id;
        if(products.length>0){
            let lastproduct_array=products.slice(-1);
            let last_product=lastproduct_array[0];
            id= last_product.id+1;
        }
        else{
            id=1;
        }


        const product= new productModel({
            id:id,
            name:req.body.name,
            image:req.body.image,
            category:req.body.category,
            new_price:req.body.new_price,
            old_price:req.body.old_price
        });
        console.log(product);

        //saving product in the database
        await product.save();
        console.log("Porduct saved in the database");
        res.status(201).json({
            success:true,
            name:req.body.name,
        })

    } catch(error){
        res.status(500).json({
            error:`unable to add product ${error}`
        })
        console.log(error)
    }

}

const removeProduct= async (req,res)=>{
    try{
        await productModel.findOneAndDelete({
            id:req.body.id
        })
        console.log("Product removed successfully");
        res.status(200).json({
            success:true,
            name:req.body.name
        })

    } catch(error){
        res.status(500).json({
            success:true,
            error
        })
    }
}

const allProduct= async (req,res)=>{
    try{
        const products= await productModel.find({})
        console.log("All product fetched");
        res.status(200).json({
            success:true,
            products

        })

    } catch(error){
         res.status(500).json({
            success:true,
            error
        })
        
    }

}

const newCollection= async (req,res)=>{
    let products=await productModel.find({});
    let newCollections=products.slice(1).slice(-8);
    console.log("Newcollection fetched",newCollections);
    res.status(200).send(newCollections);

}

const popularWomen= async (req,res)=>{
    let products= await productModel.find({category:"women"});
    let popular_women=products.slice(0,4);
    console.log("popular in women fetched");
    res.status(200).send(popular_women);
}

const addTocart= async (req,res)=>{
 let userdata=await userModel.findOne({_id:req.user.id});
 userdata.cartData[req.body.itemId] +=1;
 await userModel.findByIdAndUpdate({_id:req.user.id},{cartData:userdata.cartData});
 res.status(200).send("Item added to the cart")

}

const removefromCart = async (req, res) => {
  try {
    const itemId = req.body.itemId?.toString();
    if (!itemId) return res.status(400).send("Item ID is required");

    const userdata = await userModel.findById(req.user.id);
    if (!userdata) return res.status(404).send("User not found");

    if (!userdata.cartData || typeof userdata.cartData !== 'object') {
      userdata.cartData = {};
    }

    if (userdata.cartData[itemId] > 1) {
      userdata.cartData[itemId] -= 1;
    } else if (userdata.cartData[itemId] === 1) {
      delete userdata.cartData[itemId];
    } else {
      return res.status(400).send("Item not found in cart");
    }

    userdata.markModified("cartData");

    await userdata.save(); 

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
      cart: userdata.cartData,
    });
  } catch (error) {
    console.error("Remove from cart error:", error);
    return res.status(500).send("Something went wrong");
  }
};




 const cartItem = async (req, res) => {
  try {
    console.log("Get cart");

    const userData = await userModel.findById(req.user.id);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      cartData: userData.cartData || {}
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports={addProduct,removeProduct,allProduct,newCollection,popularWomen,addTocart,removefromCart,cartItem}