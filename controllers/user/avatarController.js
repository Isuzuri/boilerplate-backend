import { User } from '../../models/User.js';
import logger from '../../utils/logger.js';

export async function avatarUpload(req, res, next) {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      logger.warn(`Avatar upload failed: user ${req.user.username} (id: ${req.user.id}) not found`);
      const error = new Error('User not found');
      error.status = 404;
      next(error);
    }

    if (!req.file) {
      logger.warn(`Avatar upload failed: no file uploaded by user ${req.user.username} (id: ${req.user.id})`);
      const error = new Error('No file uploaded');
      error.status = 400;
      next(error);
    }

    user.avatar_url = `/uploads/${req.file.filename}`;
    await user.save();

    logger.info(`Avatar uploaded for user ${user.username} (id: ${user.id})`);

    const fullUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ success: true, avatar_url: fullUrl });
  } catch (err) {
    logger.error(`Avatar upload error for user ${req.user?.username} (id: ${req.user?.id}): ${err.message}`);
    next(err);
  }
}
