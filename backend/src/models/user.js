const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
            trim: true,
            minLength: 2,
            maxLength: 50,
        },
        lastname: {
            type: String,
            trim: true,
            maxLength: 50,
        },
        emailid: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email address: " + value);
                }
            },
        },
        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Enter a strong password: " + value);
                }
            },
        },
        age: {
            type: Number,
            min: 18,
            required: true,
        },
        gender: {
            type: String,
            validate(value) {
                if (
                    !["male", "female", "others"].includes(value.toLowerCase())
                ) {
                    throw new Error("Gender data is not valid");
                }
            },
        },
    },
    {
        timestamps: true,
    },
);

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(
        passwordInputByUser,
        passwordHash,
    );
    return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
