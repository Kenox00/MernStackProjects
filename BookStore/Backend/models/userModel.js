import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true, // Ensure email is unique
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Add createdAt and updatedAt timestamps
    }
);

// Signup static method
UserSchema.statics.signup = async function ( email, password) {
    // Validate fields
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw Error("Email is not valid");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough");
    }

    // Check if email already exists
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("Email already in use");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create and return user
    const user = await this.create({ email, password: hash });
    return user;
};

// Login static method
UserSchema.statics.login = async function (email, password) {
    // Validate fields
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    // Find user by email
    const user = await this.findOne({ email });
    if (!user) {
        throw Error("User is not registered");
    }

    // Check if password matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
};

export const User = mongoose.model("User", UserSchema);
