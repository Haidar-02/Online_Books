const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

const userController = require("../controllers/users.controllers");

router.post("/follow/:userId", authMiddleware, userController.followUser);
router.post("/post/", authMiddleware, userController.postBook);
router.post("/like/:bookId", authMiddleware, userController.likeBook);
router.get("/getAllFollowed", authMiddleware, userController.getAllFollowed);
router.get("/getAllLiked", authMiddleware, userController.getAllLiked);
router.get("/discover", authMiddleware, userController.discoverBooks);
router.get("/search/", authMiddleware, userController.search);

module.exports = router;
