import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide an username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide an password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})


const User = mongoose.models.users || mongoose.model("users", userSchema);

// User is the Model class (linked to 'users' collection)
// User (the class) → lets you run operations like find, create, update, delete.
// new User({...}) (an instance of that class) → represents one document inside the "users" collection.

export default User;