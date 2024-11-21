import mongoose from "mongoose";

const AuthorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  nationality: {
    type: String,
    required: true,
  },
  email: { 
    type: String,
     required: true,
      unique: true },

});
export default mongoose.model("Author", AuthorSchema);




