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
        photourl: {
            type: String,
            trim: true,
            validate(value) {
                if (
                    value &&
                    !validator.isURL(value, {
                        protocols: ["http", "https"],
                        require_protocol: true,
                    })
                ) {
                    throw new Error("Invalid photo URL");
                }
            },
        },
        about: {
            type: String,
            trim: true,
            maxLength: 500,
        },
        skill: {
            type: [String],
            default: [],
            validate(value) {
                if (!Array.isArray(value)) {
                    throw new Error("Skill must be an array");
                }
                if (value.length > 20) {
                    throw new Error("Skill cannot have more than 20 entries");
                }
                for (const s of value) {
                    if (
                        typeof s !== "string" ||
                        s.trim().length === 0 ||
                        s.length > 30
                    ) {
                        throw new Error(
                            "Each skill must be a non-empty string up to 30 chars",
                        );
                    }
                }
            },
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
