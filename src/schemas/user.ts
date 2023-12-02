import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    authentication: {
        password: {type: String, select: false},
        accessToken: {type: String, select: false}
    }
})

const User = mongoose.model("User", userSchema);

export default User;