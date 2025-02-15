import express from "express";
import {
  Login,
  Update,
  userdelete,
  Signup,
  fetchAllUsers,
  profilepicUpdate,
  googleAuth,
  checkAuth,
  logout
} from "../Controllers/userController.js";
import { validateToken } from "../Middlewares/validateToken.js";
import upload from "../Middlewares/multer.js";

const router = express.Router();

router.post("/login", Login);

router.post("/signup", Signup);

router.post("/googleAuth", googleAuth);

router.post("/logout", logout);

// user/Admin crud
router.get("/fetchall", validateToken, fetchAllUsers); //Only Admin

router.get("/checkAuth", validateToken, checkAuth); // user himself

router.put("/update", validateToken, Update);

router.put(
  "/profilepicUpdate",
  upload.single("profilepic"),
  validateToken,
  profilepicUpdate
);

router.delete("/userdelete", validateToken, userdelete);

export default router;
