import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import { Readable } from "stream"; // Import Readable to convert buffer to stream

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function to upload image to Cloudinary
const imageUploadUtil = async (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // Automatically detect the resource type (image, video, etc.)
      },
      (error, result) => {
        if (error) {
          reject(new Error(`Image upload failed: ${error.message}`));
        } else {
          resolve(result);
        }
      }
    );

    // Convert the file buffer into a stream
    const bufferStream = new Readable();
    bufferStream.push(file.buffer);
    bufferStream.push(null); // Indicates the end of the stream
    bufferStream.pipe(stream);
  });
};

// Multer setup
const upload = multer({ storage: multer.memoryStorage() });

export { upload, imageUploadUtil };
