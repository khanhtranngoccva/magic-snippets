const database = require("../config/database").database;
const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema({
    userID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        required: true,
        type: String,
        default: "An unnamed magic snippet!",
    },
    likes: {
        required: true,
        type: Number,
        default: 0,
    },
    createdAt: {
        required: true,
        type: Date,
        default: Date.now,
    },
    HTMLSnippet: {
        required: true,
        type: String,
        default: "",
    },
    CSSSnippet: {
        required: true,
        type: String,
        default: "",
    },
    JSSnippet: {
        required: true,
        type: String,
        default: "",
    },
    blogContent: {
        required: true,
        type: String,
        default: "",
    }
});

const Snippet = database.model("Snippet", SnippetSchema);
module.exports = Snippet;