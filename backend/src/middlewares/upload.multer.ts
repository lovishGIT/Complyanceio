import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, path.join(process.cwd(), '/'));
    },
    filename: (_, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}`;
        cb(
            null,
            `${file.fieldname}-${uniqueSuffix}${path.extname(
                file.originalname
            )}`
        );
    },
});

export const upload = multer({
    storage,
    limits: { fileSize: 2000000 }, // 2MB
});
