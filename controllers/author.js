import Author from "../models/author.js";
import Joi from "joi";

// Joi schema for Author validation
const authorSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(1).allow("").optional(),
  nationality: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
});

// Middleware to validate `req.body`
export const validateAuthor = (req, res, next) => {
  const { error } = authorSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Fetch all authors
export const fetchAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single author by ID
export const fetchAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new author
export const createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an author by ID
export const updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an author by ID
export const deleteAuthor = async (req, res) => {
  try {
    const result = await Author.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Author not found" });
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
