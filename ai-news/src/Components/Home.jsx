import React, { useEffect, useState } from "react";
import axios from "axios";
import NewsCard from "./NewsCard";
import ExtendedNews from "./ExtendedNews";
import NavBar from "./NavBar";

const Home = () => {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://www.toptal.com/developers/feed2json/convert?url=https%3A%2F%2Ftimesofindia.indiatimes.com%2Frssfeedstopstories.cms"
        );
        console.log(response.data.items);
        setNews(response.data.items);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  // Handle selecting a news article
  const handleArticleSelect = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div className="flex flex-col w-ful">
      <NavBar />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-80 p-5 bg-gray-100 shadow-lg top-16 fixed left-0 h-full overflow-y-auto">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">
            Latest News
          </h2>
          <div className="space-y-4">
            {news && news.length > 0 ? (
              news.map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  onClick={handleArticleSelect}
                />
              ))
            ) : (
              <p className="text-gray-500">Loading news...</p>
            )}
          </div>
        </div>
      </div>
      {/* Extended News View */}
      <div className="ml-40 p-5 w-full items-center  bg-white">
        <ExtendedNews article={selectedArticle} />
      </div>
    </div>
  );
};

export default Home;
