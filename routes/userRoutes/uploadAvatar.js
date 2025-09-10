import { uploadAvatar } from "../../controllers/userController/uploadAvatar";
import { authenticateActionToken } from "../../middleware/auth";
import { uploadAvatarMiddleware } from "../../middleware/uploadAvatarMiddleware";
import express from "express";

const router = express.Router();

router.post('/upload-avatar', authenticateActionToken, uploadAvatarMiddleware.single('avatar'), uploadAvatar);