const Snippet = require("../models/Snippet");
const User = require("../models/User");
const SnippetLike = require("../models/SnippetLike");
const express = require("express");
const path = require("path");

module.exports = {
    /**
     * Create a code snippet.
     * @param {express.Request} req The ExpressJS request object.
     * @param {string} req.body.HTMLSnippet The HTML portion's contents.
     * @param {string} req.body.CSSSnippet The CSS portion's contents.
     * @param {string} req.body.JSSnippet The JS portion's contents.
     * @param {string} req.body.name The name of the snippet.
     * @param {express.Response} res The ExpressJS response object.
     * @route POST /api/snippets/create
     * @returns {Promise<void>}
     */
    createSnippet: async function (req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    reason: "You must sign in to create a snippet.",
                    data: null,
                });
            } else {
                const newSnippet = await Snippet.create({
                    userID: req.user.id,
                    name: req.body.name,
                    HTMLSnippet: req.body.HTMLSnippet,
                    CSSSnippet: req.body.CSSSnippet,
                    JSSnippet: req.body.JSSnippet,
                    blogContent: req.body.blogContent,
                });
                res.json({
                    success: true,
                    data: newSnippet,
                });
            }
        } catch (e) {
            console.error(e);
        }
    },
    /**
     * Delete a code snippet.
     * @param req {express.Request} Request object.
     * @param res {express.Response} Response object.
     * @param req.params.snippetID The ID of the snippet to delete.
     * @route DELETE /api/snippets/delete/:snippetID
     * @returns {Promise<void>}
     */
    deleteSnippet: async function (req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    reason: "You must sign in to like a snippet.",
                    data: null,
                });
            } else {
                const snippet = await Snippet.findById(req.params.id);
                if (snippet.userID.toString() !== req.user.id.toString()) {
                    res.status(401).json({
                        success: false,
                        reason: "This snippet does not belong to you.",
                        data: null,
                    });
                } else {
                    await Snippet.deleteOne(req.params.id);
                    await SnippetLike.deleteMany({snippetID: req.params.id});
                    await Comment.deleteMany({snippetID: req.params.id});
                    res.send({
                        success: true,
                        data: null,
                    });
                }
            }
        } catch (e) {
            console.error(e);
        }
    },
    /**
     * Get the code snippets in the order from newest to oldest.
     * @param {express.Request} req Request object.
     * @param {express.Response} res Response object.
     * @param {number|string} req.params.page The page of the request. Gets converted to a number.
     * @route GET /api/snippets/newest/:page
     * @returns {Promise<void>}
     */
    getNewest: async function (req, res) {
        try {
            const pageSize = 6;
            const curPage = +req.params.page ?? 1;
            const firstIndex = (curPage - 1) * pageSize;
            const nextIndex = curPage * pageSize;
            const snippets = await Snippet.find().sort({
                createdAt: -1
            }).slice(firstIndex, nextIndex).lean();
            console.log(snippets);
            res.json({
                success: true,
                data: snippets,
            });
        } catch (e) {
            console.error(e);
        }
    },
    /**
     * Edit a code snippet.
     * @param {express.Request} req Request object.
     * @param {express.Response} res Response object.
     * @param req.params.snippetID The ID of the snippet to edit.
     * @param {string} req.body.HTMLSnippet The HTML portion's contents.
     * @param {string} req.body.CSSSnippet The CSS portion's contents.
     * @param {string} req.body.JSSnippet The JS portion's contents.
     * @param {string} req.body.name The name of the snippet.
     * @route GET /api/snippets/edit/:snippetID
     * @returns {Promise<void>}
     */
    editSnippet: async function (req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    reason: "You must sign in to like a snippet.",
                    data: null,
                });
            } else {
                const currentSnippet = await Snippet.findById(req.params.id);
                if (currentSnippet.userID.toString() !== req.user.id.toString()) {
                    res.status(401).json({
                        success: false,
                        reason: "This snippet does not belong to you.",
                        data: null,
                    });
                } else {
                    const editedSnippet = await Snippet.findOneAndUpdate({
                        _id: req.params.id,
                    }, {
                        $set: {
                            name: req.body.name,
                            HTMLSnippet: req.body.HTMLSnippet,
                            CSSSnippet: req.body.CSSSnippet,
                            JSSnippet: req.body.JSSnippet,
                            blogContent: req.body.blogContent,
                        }
                    });
                    res.json({
                        success: true,
                        reason: null,
                        data: editedSnippet,
                    })
                }
            }
        } catch (e) {
            console.error(e);
        }
    },
    previewSnippet: async function (req, res) {
        try {
            res.render(path.join(__dirname, "..", "views", "preview.ejs"), {
                HTMLSnippet: req.body.HTMLSnippet,
                CSSSnippet: req.body.CSSSnippet,
                JSSnippet: req.body.JSSnippet,
            });
        } catch (e) {
            console.error(e);
        }
    },
    /**
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getSnippet: async function (req, res) {
        try {
            const currentSnippet = await Snippet.findById(req.params.id).lean();
            if (!currentSnippet) {
                res.status(404).json({
                    success: false,
                    reason: "Not found",
                });
            } else {
                res.json({
                    success: true,
                    data: {
                        ...currentSnippet,
                        creator: await User.getPublicInfo(currentSnippet.userID),
                    },
                })
            }
        } catch (e) {
            console.error(e);
        }
    },
    remixSnippet: async function (req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    reason: "You must sign in to remix a snippet.",
                    data: null,
                });
            } else {
                const originalSnippet = await Snippet.findById(req.params.id);
                if (!originalSnippet) {
                    res.status(404).json({
                        success: false,
                        reason: "The snippet does not exist, or has been deleted.",
                        data: null,
                    });
                }
                const newSnippet = await Snippet.create({
                    userID: req.user.id,
                    name: originalSnippet.name,
                    HTMLSnippet: originalSnippet.HTMLSnippet,
                    CSSSnippet: originalSnippet.CSSSnippet,
                    JSSnippet: originalSnippet.JSSnippet,
                });
                res.json({
                    success: true,
                    data: newSnippet,
                });
            }
        } catch (e) {
            console.error(e);
        }
    },
}