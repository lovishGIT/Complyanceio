import mongoose, { Schema } from 'mongoose';
import bcrypt from "bcryptjs";
import { IUser } from '../types/userTypes.js';

const userSchema: Schema<IUser> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    country: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    refreshToken: {
        type: String,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
    },
});

userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('refreshToken')) {
        this.refreshToken = this.refreshToken?.toString()?.trim();
    }
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.checkPassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getSendableUser = function () {
    return {
        _id: this._id,
        username: this.username,
        email: this.email,
        country: this.country,
        role: this.role,
    }
};

const User = mongoose.model("user", userSchema);
export default User;