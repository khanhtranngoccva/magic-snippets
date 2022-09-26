const database = require("../config/database").database;
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    userID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    snippetID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Snippet",
    },
    content: {
        required: true,
        type: String,
    },
    likes: {
        required: true,
        type: Number,
        default: 0,
    }
});

module.exports = database.model("Comment", CommentSchema);