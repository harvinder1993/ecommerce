const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const aysncErrors = require("./aysncErrors");
const jwt = require('jsonwebtoken')

exports.isAuthenticatedUser = aysncErrors( async (req,res,next) => {

    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please login to access this resource",401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);
    next();
})