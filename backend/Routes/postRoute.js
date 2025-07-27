import express from "express";
import upload from "../Middlewares/multer.js";
import {
  createPost,
  deletePost,
  fetchAllPost,
  updatePost,
  getcategory,
  getpostbycategoryname,
  fetchAllpostOfUser,
  getUserByHisId,
  fetchPostById,
  fetchAllpostByUserId,
  toggleLike,
  createComment,
} from "../Controllers/postController.js";
import { validateToken } from "../Middlewares/validateToken.js";

const router = express.Router();

router.get("/fetchall", fetchAllPost);

router.get("/fetchonepost/:id", fetchPostById);

router.get("/fetchallpostbyuserid/:id", fetchAllpostByUserId);

router.get("/fetchone", validateToken, fetchAllpostOfUser);

router.get("/getuserbyhisid/:id", getUserByHisId);

router.get("/getcategory", getcategory);

router.get("/getpostbycategoryname", getpostbycategoryname);

router.post("/createpost", validateToken, upload.single("image"), createPost);

router.put(
  "/updatepost/:id",
  validateToken,
  upload.single("image"),
  updatePost
);
router.put("/createcomment/:blogId", validateToken, createComment);

router.delete(
  "/deletepost/:id",
  validateToken,
  upload.single("image"),
  deletePost
);

router.put("/togglelike/:id", validateToken, toggleLike);

export default router;
