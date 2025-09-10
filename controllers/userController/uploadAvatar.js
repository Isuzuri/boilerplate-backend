export async function uploadAvatar(req, res) {
  const user = await User.findByPk(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  if (user.id !== req.user.id) return res.status(403).json({ error: 'You are not allowed to upload avatar for this user' });

  user.avatar_url = `/uploads/${req.file.filename}`;
  await user.save();

  res.json({ success: true, avatar_url: user.avatar_url });
}