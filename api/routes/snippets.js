const router = require("express").Router();
const snippetController = require("../controllers/snippets");

router.post("/create", snippetController.createSnippet);
router.put("/like", snippetController.likeSnippet);
router.put("/edit/:id", snippetController.editSnippet);
router.delete("/delete", snippetController.deleteSnippet);
router.get("/view/:id", snippetController.getSnippet);
router.post("/preview", snippetController.previewSnippet);

module.exports = router;
