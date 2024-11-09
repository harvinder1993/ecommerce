const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middleware/aysncErrors');
const Features = require('../utils/features');

exports.createProduct = asyncErrors(async (req,res,next) => {

    const product = await Product.create(req.body);
    
    res.status(200).json({
        success:true,
        product
    });
});

exports.getAllProducts = asyncErrors(async (req,res) => {

    const resultPerPage = 5;
    const feature = new Features(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await feature.query;

    res.status(200).json({
        success:true,
        products
    });
});

exports.getProductDetails = asyncErrors(async (req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",400))
    }

    res.status(200).json({
        success:true,
        product
    });

});

exports.updateProduct = asyncErrors(async (req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",400))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

    res.status(200).json({
        success:true,
        product
    });

});

exports.deleteProduct = asyncErrors(async (req,res,next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",400))
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    });
});