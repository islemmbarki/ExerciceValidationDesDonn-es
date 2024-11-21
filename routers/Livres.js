// import {
//   fetchLivres,
//   fetchLivre,
//   createLivre,
//   updateLivre,
//   deleteLivre,
// } from "../controllers/Livres.js";

// import express from "express";

// const router = express.Router();

// //routes
// router.get("/", fetchLivres);



// router.get("/:id", fetchLivre);
// router.post("/", createLivre);

// router.patch("/:id", updateLivre);
// router.delete("/:id", deleteLivre);
// export default router; 

import express from "express";
import {
  fetchLivres,
  fetchLivre,
  createLivre,
  updateLivre,
  deleteLivre,
  validateLivre,
} from "../controllers/Livres.js";

const router = express.Router();

// Routes
router.get("/", fetchLivres);
router.get("/:id", fetchLivre);
router.post("/", validateLivre, createLivre);
router.patch("/:id", validateLivre, updateLivre);
router.delete("/:id", deleteLivre);

export default router;





