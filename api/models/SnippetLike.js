const database = require("../config/database").database;
const mongoose = require("mongoose");

const SnippetLikeSchema = new mongoose.Schema({
    userID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    snippetID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Snippet",
    }
});

module.exports = database.model("SnippetLike", SnippetLikeSchema);