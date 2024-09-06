const dotenv = require('dotenv');
dotenv.config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    Name: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    Email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    Password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    ProfilePicture: {
        type: mongoose.SchemaTypes.String // Cloudinary Link
    },
    Role: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        // REFERENCE TO ROLE 
    }
},
    { timestamps: true }
);

//==========================HASHING PASSWORD PRE SAVE METHOD=================================
userSchema.pre("save", async function (next) {

    if (!this.Password.isModified('Password')) {
        next();
    };
    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.Password, saltRounds);
        this.Password = hashedPassword;
    }
    catch (err) {
        console.log(`error hashing the password : ${err}`);
    }
});


//============================COMPARE PASSWORD WITH HASHED PASSWORD============================
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.Password);
    }
    catch (err) {
        console.log(`failed to compare password : ${err}`);
    }
};


//===================GENERATE JWT TOKEN==================================
userSchema.methods.generateToken = async function () {
    try {
        const authToken = await jwt.sign(
            {
                userId: this._id,
            },
            process.env.AUTH_SECRET_KEY, // Corrected: secret key should be a string
            {
                expiresIn: process.env.AUTH_SECRET_EXPIRES_IN, // Corrected: `expiresIn` should be an option, not a separate argument
            }
        );

        const refreshToken = await jwt.sign(
            {
                userId: this._id,
            },
            process.env.REFRESH_SECRET_KEY, // Corrected: secret key should be a string
            {
                expiresIn: process.env.REFRESH_SECRET_EXPIRES_IN, // Corrected: `expiresIn` option
            }
        );

        const tokens = { authToken, refreshToken };
        return tokens;
    }
    catch (err) {
        console.log(`failed to generate token : ${err}`);
    }
};




const User = mongoose.model("User", userSchema);

module.exports = User;