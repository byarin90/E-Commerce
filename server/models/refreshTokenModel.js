import mongoose from "mongoose";

const RefreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

export const RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);