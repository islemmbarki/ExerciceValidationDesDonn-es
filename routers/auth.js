
import express from "express";
import User from "../models/User.js";
import { login, signup } from "../controllers/auth.js";
import { validateSignup } from "../middlewares/validation.js";

const router = express.Router();

// router.post("/signup", signup);
router.post("/login", login);
router.post("/signup", validateSignup, async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ user, message: "Utilisateur créé avec succès." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
