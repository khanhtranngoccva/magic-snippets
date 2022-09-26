const database = require("../config/database").database;
const mongoose = require("mongoose");

const NameSchema = new mongoose.Schema({
    givenName: {
        required: true,
        type: String,
    },
    familyName: {
        required: true,
        type: String,
    }
});

// We identify users by email, so that they can use how many accounts
// they please and still be able to log in to the app.
const UserSchema = new mongoose.Schema({
    userName: {
        required: true,
        type: String,
        // SSO path only. Users must specify the username in the sign up form.
        default: function() {
            return this.email.replace(/@.*$/, "");
        },
        unique: true,
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    displayName: {
        required: true,
        type: String,
        default: function() {
            return this.name.givenName + " " + this.name.familyName;
        },
    },
    roles: {
        required: true,
        default: [],
        type: Array,
    },
    name: {
        required: true,
        type: NameSchema,
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String,
    }
});

const User = database.model("User", UserSchema);
module.exports = User;