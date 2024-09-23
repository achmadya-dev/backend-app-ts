import { Request } from "express";
import moment from "moment";
import multer from "multer";
import path from "path";
import fs from "fs";

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error("Error: Images Only!"));
    }
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, "../uploads");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {
                recursive: true
            });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + moment().format("YYYY-MM-DD-HH-mm-ss") + path.extname(file.originalname));
    }
});

export const upload = multer({
    storage,
    fileFilter
});
