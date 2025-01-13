import express from "express";
import {
  saveArticle,
  getSavedArticles,
} from "../controllers/articles.js";

const router = express.Router();

// Save an article
router.post("/save-article", saveArticle);

// Get saved articles
router.get("/saved-articles", getSavedArticles);

export default router;
