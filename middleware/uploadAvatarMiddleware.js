import multer from 'multer';

const storage = multer.diskStorage({
  destination: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },  
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop();
    cb(null, `avatar_${Date.now()}.${ext}`);
  },
});

export const uploadAvatarMiddleware = multer({ storage });
