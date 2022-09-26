const router = require("express").Router();
const snippetController = require("../controllers/snippets");

router.post("/create", snippetController.createSnippet);
router.put("/like", snippetController.likeSnippet);
router.delete("/delete", snippetController.deleteSnippet);
router.post("/preview", snippetController.previewSnippet);

module.exports = router;
