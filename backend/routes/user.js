const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/sign-in", async(req, res)=>{
    try {
    const {username}=req.body;
    const {email}=req.body;
    const exsitingUser = await User.findOne({username:username});
    const exsitingEmail = await User.findOne({email:email});
    if(exsitingUser){
        return res.status(400).json({message:"Username already exists"});
    }else if(username.length < 3){
        return res.status(400).json({message:"Username should have atleast 4 characters"});
    }
    if(exsitingEmail){
        return res.status(400).json({message:"Email already exists"});
    }
    const hashPass = await bcrypt.hash(req.body.password,10);
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPass});
    await newUser.save();
    return res.status(200).json({message:"SignIn succcessfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal Server Error"});
    }
});
router.post("/log-in", async(req, res)=>{
    try {
        const {username, password}=req.body;
        const exsitingUser = await User.findOne({username:username});
        if(!exsitingUser){
            return res.status(400).json({message:"Invalid Credentials"});   
        }
        bcrypt.compare(password, exsitingUser.password,(err, data)=>{
            if(data){
                const autoClaims=[{name: username},{jti:jwt.sign({},"tcmTMA")}];
                const token=jwt.sign({autoClaims}, "tcmTMA", {expiresIn:"2d"});
                res.status(200).json({id: exsitingUser._id, token:token});
            }else{
                return res.status(400).json({message:"Invalid Credentials"});   
            }
        })
    } catch (error) {
        
    }
});
module.exports = router;