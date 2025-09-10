import { avatarController } from "../../controllers/user/avatarController";
import { authenticateActionToken } from "../../middleware/auth";
import { fileUpload } from "../../middleware/fileUpload";
import express from "express";

const router = express.Router();

router.post('/upload-avatar', authenticateActionToken, fileUpload.single('avatar'), avatarController);