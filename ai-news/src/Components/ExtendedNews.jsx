import React from "react";

const ExtendedNews = ({ article }) => {
  if (!article) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">
          Click on a news item to see more details.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="p-6 border rounded-lg shadow-md w-full max-w-4xl overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {article.title}
        </h2>
        <div className="flex justify-between items-center text-gray-600 mb-4">
          {/* Time on the left */}
          <p>
            {new Date(article.date_published).toLocaleString("en-US", {
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
            By {article.author.name || "Unknown Author"}
          </p>
        </div>
        <div className="prose">
          <p>{article.summary}</p>
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm mt-3 block hover:underline"
        >
          Read full article
        </a>
      </div>
    </div>
  );
};

export default ExtendedNews;
