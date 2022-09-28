const router = require("express").Router();
const snippetController = require("../controllers/snippets");
const likesController = require("../controllers/likes");

router.post("/create", snippetController.createSnippet);
router.put("/like/:id", likesController.likeSnippet);
router.get("/likes/:id", likesController.getSnippetLikes);
router.get("/like/:id", likesController.checkIfLiked);
router.put("/edit/:id", snippetController.editSnippet);
router.delete("/delete", snippetController.deleteSnippet);
router.get("/view/:id", snippetController.getSnippet);
router.post("/preview", snippetController.previewSnippet);
router.post("/remix/:id", snippetController.remixSnippet);

module.exports = router;
