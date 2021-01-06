import mongoose from 'mongoose';

const { Schema } = mongoose;

const videoSchema = new Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String
    },
    privacy: {
        type: Number
    },
    filePath: {
        type: String
    },
    category: {
        type: String
    },
    views: {
        type: Number
    },
    duration: {
        type: String
    },
    thumbnail: {
        type: String
    }
}, {timestamps: true});

export const Video = mongoose.model('Video', videoSchema);