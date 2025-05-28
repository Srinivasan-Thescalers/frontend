"use client";

import React, { useEffect, useState } from "react";

interface Article {
  article_id: string;
  title: string;
  image_url?: string;
  description?: string;
  pubDate: string;
}

const LiveNews: React.FC = () => {
  const [newsData, setNewsData] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/latest?apikey=pub_184f65cf0273409eab70530ac415e817&q=computer%20%2C%20mobile%20phones%20%2C%20Technology%2C%20AI%2C%20Blockchain%2C%20Artificial%20Intelligence&country=au,ca,cn,in,us&timezone=Asia/Kolkata"
        );
        const data = await response.json();
        setNewsData(data.results || []);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch news data");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 text-lg">Loading news...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 text-lg">{error}</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Live Technology News
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsData.map((article) => (
          <div
            key={article.article_id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {article.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 flex-grow">
                {article.description || "No description available."}
              </p>
              <p className="text-xs text-gray-500">
                Published on: {new Date(article.pubDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveNews;