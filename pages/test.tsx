import { NewsResource } from '@/src/Resources';
import { INews } from '@/src/backend/models/News';
import React, { useState, useEffect } from 'react';

const Test: React.FC = () => {
  const [newsList, setNewsList] = useState<NewsResource[]>([]);

  useEffect(() => {
    // Fetch news data from the API
    async function fetchNews() {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNewsList(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    fetchNews();
  }, []);

  return (
    <div>
      <h2>News List</h2>
      {newsList.map((news) => (
        <div key={news.id}>
          <h3>{news.title}</h3>
          <p>{news.text}</p>
          {news.images?.map((imageUrl) => (
            <img
              key={imageUrl}
              src={imageUrl}
              alt={`Image for ${news.title}`}
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Test;