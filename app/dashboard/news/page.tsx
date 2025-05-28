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
          "https://newsdata.io/api/1/latest?apikey=pub_184f65cf0273409eab70530ac415e817&q=technology"
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
    return <p style={styles.loading}>Loading news...</p>;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Live Technology News</h1>
      <div style={styles.grid}>
        {newsData.map((article) => (
          <div key={article.article_id} style={styles.card}>
            {article.image_url && (
              <img
                src={article.image_url}
                alt={article.title}
                style={styles.image}
              />
            )}
            <h2 style={styles.title}>{article.title}</h2>
            <p style={styles.description}>{article.description}</p>
            <p style={styles.pubDate}>
              Published on: {new Date(article.pubDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f4f4f9",
    minHeight: "100vh",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#333",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  description: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "10px",
  },
  pubDate: {
    fontSize: "12px",
    color: "#999",
  },
  loading: {
    textAlign: "center",
    fontSize: "16px",
    color: "#555",
  },
  error: {
    textAlign: "center",
    fontSize: "16px",
    color: "red",
  },
};

export default LiveNews;