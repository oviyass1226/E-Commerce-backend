const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },  
  image: { type: String, default: null }, 
  quantity: { type: Number, default: 1 }  
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },              
  cart: [cartItemSchema]                                  
});

module.exports = mongoose.model("User", userSchema);
