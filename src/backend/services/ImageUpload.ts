import { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import path from "path";
import mongoose from "mongoose";

// Connect to MongoDB
mongoose.connect("mongodb+srv://KerryKilian:Kilian.2001@cluster0.ksego6x.mongodb.net/sdf?retryWrites=true&w=majority", {
});

// Create a Multer storage for file uploads
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).array("images", 5); // 'images' is the field name for the uploaded files