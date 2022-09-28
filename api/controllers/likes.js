const SnippetLike = require("../models/SnippetLike");
const Snippet = require("../models/Snippet");
const express = require("express");

module.exports = {
    /**
     * Like a code snippet.
     * @param req {express.Request} Request object.
     * @param res {express.Response} Response object.
     * @param req.params.snippetID The ID of the snippet to like.
     * @param req.body.like Whether the user chooses to like or unlike the snippet.
     * @route PUT /api/snippets/like/:snippetID
     * @returns {Promise<void>}
     */
    likeSnippet: async function (req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    reason: "You must sign in to like a snippet.",
                    data: null,
                });
            } else {
                const snippet = await Snippet.findById(req.params.id);
                if (!snippet) {
                    res.json({
                        success: true,
                        data: {
                            like: false,
                        }
                    });
                }
                const likeObject = {
                    userID: req.user.id,
                    snippetID: req.params.id,
                };
                const lookup = await SnippetLike.findOne(likeObject);
                if (!lookup && req.body.like) {
                    await SnippetLike.create(likeObject);
                } else if (lookup && !req.body.like) {
                    await SnippetLike.deleteOne(likeObject);
                }
                res.json({
                    success: true,
                    data: {
                        like: req.body.like,
                    },
                });
            }
        } catch (e) {
            console.error(e);
        }
    },
    /**
     * Get a code snippet's like count.
     * @param req {express.Request} Request object.
     * @param res {express.Response} Response object.
     * @param req.params.snippetID The ID of the snippet to find likes.
     * @route GET /api/snippets/likes/:snippetID
     * @returns {Promise<void>}
     */
    getSnippetLikes: async function (req, res) {
        try {
            const snippet = await Snippet.findById(req.params.id);
            if (!snippet) {
                res.json({
                    success: true,
                    data: {
                        likes: 0,
                    }
                });
            }
            const likeObject = {
                snippetID: req.params.id,
            };
            const lookup = await SnippetLike.find(likeObject).count();
            res.json({
                success: true,
                data: {
                    likes: lookup,
                }
            });
        } catch (e) {
            console.error(e);
        }
    },
    /**
     * Check if the user likes the snippet or not.
     * @param req {express.Request} Request object.
     * @param res {express.Response} Response object.
     * @param req.params.snippetID The ID of the snippet to find likes.
     * @route GET /api/snippets/like/:snippetID
     * @returns {Promise<void>}
     */
    checkIfLiked: async function (req, res) {
        try {
            const snippet = await Snippet.findById(req.params.id);
            if (!snippet) {
                res.json({
                    success: true,
                    data: {
                        like: false,
                    }
                });
            }
            const likeObject = {
                userID: req.user.id,
                snippetID: req.params.id,
            };
            const lookup = !!(await SnippetLike.findOne(likeObject));
            res.json({
                success: true,
                data: {
                    like: lookup,
                }
            });
        } catch (e) {
            console.error(e);
        }
    },
}