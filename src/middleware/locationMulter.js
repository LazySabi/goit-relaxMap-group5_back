import createHttpError from 'http-errors';
import multer from 'multer';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png'];
const MAX_FILE_SIZE = 1 * 1024 * 1024;

export const locationUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(
      createHttpError(
        400,
        'Invalid file type. Only JPG and PNG images are allowed',
      ),
      false,
    );
  },
});