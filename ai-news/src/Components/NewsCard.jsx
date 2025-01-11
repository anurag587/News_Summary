import React from 'react';

const NewsCard = ({ article, onClick }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md hover:bg-gray-50 transition-all cursor-pointer"
      onClick={() => onClick(article)}
    >
      <h3 className="text-lg font-semibold text-gray-800">{article.title}</h3>
      <p className="text-gray-600 text-sm mt-2">{article.description}</p>
    </div>
  );
};

export default NewsCard;
