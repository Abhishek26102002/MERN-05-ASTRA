import express from "express";
import { validateToken } from "../Middlewares/validateToken.js";
import {
  getNotification,
  markNotificationAsRead,
} from "../Controllers/notificationController.js";

const router = express.Router();

router.get("/getall", validateToken, getNotification);

router.put("/markasread", validateToken, markNotificationAsRead);

export default router;
