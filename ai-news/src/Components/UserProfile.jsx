import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSavedArticles } from "../redux/user/userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { savedArticles, user } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchSavedArticles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/articles/saved-articles?userId=${user._id}`
        );
        const data = await response.json();

        if (response.ok) {
          dispatch(setSavedArticles(data.savedArticles));
        } else {
          console.error(data.message || "Failed to fetch articles");
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (user) {
      fetchSavedArticles();
    }
  }, [user, dispatch]);

  return (
    <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Saved Articles</h1>
    {savedArticles.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {savedArticles.map((article, index) => (
          <div key={index} className="border p-4 rounded-md">
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-lg font-bold">{article.title}</h2>
            <p>{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    ) : (
      <p>No saved articles yet.</p>
    )}
  </div>
  
  );
};

export default UserProfile;
