const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter name"],
        trim:true
    },
    description:{
        type:String,
        required:[true, "Please enter description"]
    },
    price:{
        type:Number,
        required:[true,"Please enter price"],
        maxLength:[8,"Price cannot exceed 8 digits"]
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter stock"],
        maxLength:[4,"Stock cannot exceed 4 digits"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true,
            },
            commnent:{
                type:String,
                required:true,
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Product",product)