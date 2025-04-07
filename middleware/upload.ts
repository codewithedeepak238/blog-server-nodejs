import multer from "multer";
import multerS3 from "multer-s3";
import { s3 } from "../utils/s3";
import path from "path";

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME!,
    acl: "public-read",
    key: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const filename = `banners/${Date.now()}-${file.originalname}`;
      cb(null, filename);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, WEBP images allowed"));
    }
    cb(null, true);
  },
});

export default upload;
