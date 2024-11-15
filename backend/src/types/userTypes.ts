import { Document, ObjectId } from 'mongoose';

interface SendableUser {
    _id: ObjectId;
    username: string;
    email: string;
    country: string;
    role: string;
}

export interface IUser extends Document {
    _id: ObjectId;
    username: string;
    email: string;
    password: string;
    country: string;
    role: string;
    refreshToken?: string;
    checkPassword(enteredPassword: string): Promise<boolean>;
    isModified(path: string): boolean;
    getSendableUser(): SendableUser;
}

export interface RequestUser {
    _id: ObjectId;
    role?: string;
}