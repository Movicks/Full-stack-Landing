// Schema.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model("User", userSchema);
export default User;
