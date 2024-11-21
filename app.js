import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import livreRoutes from "./routers/Livres.js";
import authorRoutes from "./routers/author.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routers
app.use("/api/livres", livreRoutes);
app.use("/api/authors", authorRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/livredb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
