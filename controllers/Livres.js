// import Livres from "../models/Livres.js";
// // Fetch all books
// export const fetchLivres = async (req, res) => {
//   try {
//     const livres = await Livres.find();
//     res.status(200).json({ model: livres, message: "success" });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };
// export const fetchLivre = async (req, res) => {
//   try {
//     const livre = await Livres.findOne({ _id: req.params.id });
//     if (!livre) {
//       res.status(404).json({ model: livre, message: "objet non trouvé" });
//     } else {
//       res.status(200).json({ model: livre, message: "objet trouvé" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// export const createLivre = async (req, res) => {
//   try {
//     console.log("body:", req.body);
//     const livre = new Livres(req.body);
//     await livre.save();
//     res.status(201).json({ model: livre, message: "success" });
//   } catch (error) {
//     res.status(400).json({
//       error: error.message,
//       message: "donnés invalides",
//     });
//   }
// };
// export const updateLivre = async (req, res) => {
//   try {
//     console.log("id:", req.params.id);
//     console.log("body:", req.body);
//     const livre = await Livres.findOneAndUpdate(
//       { _id: req.params.id },
//       req.body,
//       {
//         new: true,
//       }
//     );
//     if (!livre) {
//       res.status(404).json({ model: livre, message: "objet non trouvé" });
//     } else {
//       res.status(200).json({ model: livre, message: "objet trouvé" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
// export const deleteLivre = async (req, res) => {
//   try {
//     console.log("id:", req.params.id);
//     const livre = await Livres.deleteOne({ _id: req.params.id });
//     console.log(livre);
//     if (!livre.deletedCount) {
//       res.status(404).json({ model: livre, message: "objet non trouvé" });
//     } else {
//       res.status(200).json({ model: livre, message: "objet trouvé" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

import Livre from "../models/Livres.js";
import Joi from "joi";

// Joi Validation Schema
const livreSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  price: Joi.number().positive().required(),
  author: Joi.string().required(),
});

// Middleware to validate Livre
export const validateLivre = (req, res, next) => {
  const { error } = livreSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// CRUD Controllers
export const fetchLivres = async (req, res) => {
  try {
    const livres = await Livre.find().populate("author", "name email");
    res.status(200).json(livres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const fetchLivre = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id).populate("author", "name email");
    if (!livre) return res.status(404).json({ message: "Livre not found" });
    res.status(200).json(livre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLivre = async (req, res) => {
  try {
    const livre = new Livre(req.body);
    await livre.save();
    res.status(201).json(livre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateLivre = async (req, res) => {
  try {
    const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livre) return res.status(404).json({ message: "Livre not found" });
    res.status(200).json(livre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteLivre = async (req, res) => {
  try {
    const result = await Livre.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: "Livre not found" });
    res.status(200).json({ message: "Livre deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

