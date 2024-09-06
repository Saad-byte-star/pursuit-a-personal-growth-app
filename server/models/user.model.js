const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    email : {
        type : mongoose.SchemaTypes.String,
        required : true,
        unique : true
    },
    password : {
        type : mongoose.SchemaTypes.String,
        required : true
    },
    profilePicture : {
        type : mongoose.SchemaTypes.String // Cloudinary Link
    },
    role : { 
        type : mongoose.SchemaTypes.ObjectId,
        
    }
})