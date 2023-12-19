import multer from "multer";

const storage = multer.diskStorage({
destination(req: any, file: any, cb: any) {
    cb(null, "public/book");
  },
filename(req: any, file: any, cb: any) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export default multer({ storage });