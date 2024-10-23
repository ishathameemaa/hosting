import usermodel from "../models/usermodel.js"

// add item to user cart
const addTocart = async (req,res)=>{
    try {
      let userData = await usermodel.findById(req.body.userId)
      let cartData = await userData.cartData;
      if(!cartData[req.body.itemId])
      {
        cartData[req.body.itemId]=1;
      }
      else{
        cartData[req.body.itemId] +=1;
      }
      await usermodel.findByIdAndUpdate(req.body.userId,{cartData});
      res.json({success:true,message:"Added To cart"})
    } catch (error) {
      console.log(error);
      res.json({success:false,message:"Error"})
      
      
    }

}

//remove items from user cart
const removeFromCart = async (req, res) => {
  try {
    // Fetch the user data from the database
    let userData = await usermodel.findById(req.body.userId);

    // Extract the cart data
    let cartData = userData.cartData;

    // Check if the item exists in the cart and has a quantity greater than 0
    if (cartData[req.body.itemId] && cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;

      // If the quantity reaches zero, you might want to remove the item completely
      if (cartData[req.body.itemId] === 0) {
        delete cartData[req.body.itemId];
      }

      // Update the user's cart in the database
      await usermodel.findByIdAndUpdate(req.body.userId, { cartData });

      // Send a success response
      res.json({ success: true, message: "Removed from cart" });
    } else {
      res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
//fetch user card data
const getCart = async (req,res)=>{
  try {
    let userData = await usermodel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
    
  }

}
export {addTocart,removeFromCart,getCart}