const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/aysncErrors');

const User = require('../models/user');
const sendToken = require('../utils/jwtToken');

//Register
exports.registerUser = asyncErrors(async (req,res,next) => {

    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"this is sample id",
            url:"profilePic",
        },
    });

    sendToken(user,201,res);
});

exports.loginUser = asyncErrors( async (req,res,next) => {

    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter email & password",400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",400))
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",400))
    }

    sendToken(user,200,res);
});

//Logout

exports.logout = asyncErrors ( async (req,res,next) => {
    res.cookie("token",null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message:"Logout successfully"
    })
})