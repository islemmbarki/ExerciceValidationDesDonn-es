import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Indique uniquement à MongoDB de créer un index unique
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
  },
});

// Validation de l'unicité avant la sauvegarde
userSchema.pre("save", async function (next) {
  const existingUser = await mongoose.models.User.findOne({ email: this.email });
  if (existingUser) {
    throw new Error("L'email doit être unique.");
  }
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
