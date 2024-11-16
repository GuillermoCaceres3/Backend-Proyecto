import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        default: "https://cdn.icon-icons.com/icons2/1916/PNG/512/person_121780.png",
    },
    googleId: {
        type: String,
        unique: true, 
        sparse: true, 
    },
    userType:{
        type: String,
        enum: ["user", "admin","premium"],
        default: "user",
    },
    favoriteRecipes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe",
        }
    ],
},
{timestamps: true}
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;