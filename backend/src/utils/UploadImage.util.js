import fs from "fs/promises";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to store uploaded media
const mediaDir = path.join(__dirname, "../../media");

// Function to create the media directory if it doesn't exist
const createMediaDir = async () => {
  try {
    // Check if the directory exists
    await fs.access(mediaDir);
  } catch (error) {
    // If it doesn't exist, create it
    await fs.mkdir(mediaDir);
  }
};

createMediaDir();

// Set up storage for uploaded files
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, mediaDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create the multer instance
export const uploadFile = multer({
  storage: fileStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(
        new Error(
          "Please upload a valid image file with extensions .jpg, .jpeg, or .png"
        )
      );
    }
    cb(null, true);
  },
}).single("image");

// TODO? Upload this picture if the media directory needs to be created
export const defaultProfilePicture = path.join(
  __dirname,
  "../../media/blank-profile-picture.png"
);
