import express from "express";
import Event from "./models/Event.js";
import { validateEvent } from "../middlewares/validation.js";

const router = express.Router();

router.post("/add", validateEvent, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ event, message: "Événement créé avec succès." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
