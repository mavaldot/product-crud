import mongoose, { mongo } from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 16,
        minLength: 8,
        unique: true
    },
    identification: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: String
    }
}, {timestamps: true});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;