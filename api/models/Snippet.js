const database = require("../config/database").database;
const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema({
    userID: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        default: "An unnamed magic snippet!",
    },
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        required: true,
        type: Date,
        default: Date.now,
    },
    HTMLSnippet: {
        type: String,
        default: "",
    },
    CSSSnippet: {
        type: String,
        default: "",
    },
    JSSnippet: {
        type: String,
        default: "",
    },
    blogContent: {
        type: String,
        default: "",
    }
});

const Snippet = database.model("Snippet", SnippetSchema);
module.exports = Snippet;