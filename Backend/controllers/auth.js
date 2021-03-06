const jwt = require('jsonwebtoken')
require('dotenv').config()
const expressJwt = require('express-jwt')
const User = require('../models/user')

exports.signup = async(req,res) => {
    const userExists = await User.findOne({email: req.body.email})
    if(userExists) return res.status(403).json({
        error:"Email is alerady taken!"
    })

    const user = await new User(req.body)
    await user.save()
    // res.status(200).json({user});
    res.status(200).json({message: "Signup Success ! Please Login"});

};

exports.signin = (req,res) => {
    //find the user based on email
    const {email,password} = req.body
    User.findOne({email},(err,user) => {
        //if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: "User does not exist. Please Sign Up."
            })
        }
        //if user is found email and password match
        //create authenticate in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error : "Email and Password do not match"
            })
        }
        //generate token with user id and secret
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
        //persist the token as 't' in cookie with expiry date 
        res.cookie('t',token,{expire : new Date() + 9999})
        //return response with user and token to frontend client
        const {_id,name,email} = user 
        return res.json({token,user:{_id,email,name}});
    });
};

exports.signout = (req,res) => {
    res.clearCookie('t');
    return res.json({message: "Signout Successful!!" });
};

exports.requireSignin = expressJwt({
    //if token is valid , express jwt appends the verifief users id
    // in an auth key to the request object
    secret: process.env.JWT_SECRET,
    userProperty:"auth"
})