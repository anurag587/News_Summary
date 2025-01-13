import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveArticleToProfile } from "../redux/user/userSlice";

const ExtendedNews = ({ article }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user); // Get the user from Redux

  if (!article) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">
          Click on a news item to see more details.
        </p>
      </div>
    );
  }

  const saveArticle = async (article) => {
    if (!user) {
      alert("You must be logged in to save articles!");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/articles/save-article",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            _id: user._id, // Send the user ID along with the article
            article,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Article saved successfully!");
        // Dispatch the action to update the profile with the saved article
        dispatch(saveArticleToProfile(data.article));
      } else {
        console.log("Error saving article:", data.message);
      }
    } catch (error) {
      console.log("Error saving article:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="p-6 border rounded-lg shadow-md w-full max-w-4xl overflow-auto">
        {/* Image Section */}
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {article.title}
        </h2>
        <div className="flex justify-between items-center text-gray-600 mb-4">
          {/* Time on the left */}
          <p>
            {new Date(article.publishedAt).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          {/* Author on the right */}
          <p className="font-semibold">
            By {article.author || "Unknown Author"}
          </p>
        </div>
        <div className="prose">
          <p>{article.description}</p>
        </div>
        <div className="flex">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-sm mt-3 block hover:underline"
          >
            Read full article
          </a>
          <button
            onClick={() => saveArticle(article)} // Call saveArticle directly
            className="ml-auto text-sm mt-3 border border-gray-300 p-2 rounded hover:bg-gray-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtendedNews;
