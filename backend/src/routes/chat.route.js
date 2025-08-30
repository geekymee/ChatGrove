import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getFriendList } from "../controllers/chat.controller.js";
import { getStreamToken } from "../controllers/chat.controller.js";
import { getChats , sendChatMessage } from "../controllers/chat.controller.js";
const router = express.Router();

router.get("/users", protectRoute, getFriendList);
router.get("/:id" , protectRoute, getChats);
router.post("/send/:id", protectRoute, sendChatMessage);
router.get("/:id/token", protectRoute, getStreamToken);


export default router;