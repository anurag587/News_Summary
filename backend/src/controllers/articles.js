import User from "../models/user.js";

// Save an article
export const saveArticle = async (req, res) => {
  const { _id, article } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the article is already saved
    const isAlreadySaved = user.savedArticles.some(
      (savedArticle) => savedArticle.url === article.url
    );

    if (isAlreadySaved) {
      return res.status(400).json({ message: "Article already saved" });
    }

    user.savedArticles.push(article);
    await user.save();

    res.status(200).json({ message: "Article saved successfully", article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get saved articles
export const getSavedArticles = async (req, res) => {
  const { _id } = req.query;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ savedArticles: user.savedArticles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
