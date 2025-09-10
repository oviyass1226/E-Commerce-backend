const express = require("express")
const app = express()
app.use(express.json())
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('./model/connection')
const User = require('./model/schema')
const JWT_SECRET = "bit123$@";
const PORT = 5050;


app.post("/post", async(req,res)=>{
    try {
        const {username,email,password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        await newUser.save()
        res.json({message:"User data inserted successfully"})
    } catch (error) {
        res.status(500).json({message:"Error inserting user data",error:error.message});
    }
});

app.get("/get",async(req,res)=>{
    try {
        const user = await User.find();
        res.json({message:"User data retrieved successfully",user})
    } catch (error) {
        res.json({message:"Error retrieving user data",error:error.message})
    }
})

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email }, 
      JWT_SECRET,                         
      { expiresIn: "1h" }                
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
