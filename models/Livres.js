import mongoose from "mongoose";
const LivresSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
});
export default mongoose.model("Livres", LivresSchema);
