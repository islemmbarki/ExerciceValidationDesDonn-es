import express from "express";
import {
  fetchAuthors,
  fetchAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  validateAuthor,
} from "../controllers/author.js";

const router = express.Router();

// Routes
router.get("/", fetchAuthors);
router.get("/:id", fetchAuthor);
router.post("/", validateAuthor, createAuthor);
router.patch("/:id", validateAuthor, updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
