import mongoose from 'mongoose';

if (!mongoose.models.Image) {
    const ImageSchema = new mongoose.Schema({
      filename: String,
      originalname: String,
      path: String,
    });
    mongoose.model('Image', ImageSchema);
  }
  const Image = mongoose.model('Image');

export default Image;