import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `avatar_${Date.now()}.${ext}`);
  },
});

export const uploadAvatarMiddleware = multer({ storage });
