'use client';

import { useEffect, useState } from 'react';
import api from '@/services/api';
import toast from 'react-hot-toast';

interface ContentItem {
  _id?: string;
  contentId?: string;
  title: string;
  type: 'text' | 'image' | 'link';
  data: string;
  tags?: string[];
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
}

export default function TrackPage() {
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [recommended, setRecommended] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [contentRes, recommendRes] = await Promise.all([
        api.get('/content'),
        api.get('/recommend'),
      ]);
      setAllContent(contentRes.data);
      setRecommended(recommendRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const trackInteraction = async (
    contentId: string,
    interactionType: 'view' | 'like' | 'unlike'
  ) => {
    try {
      await api.post('/track', {
        contentId,
        type: interactionType,
      });

      const label =
        interactionType === 'like'
          ? 'Liked'
          : interactionType === 'unlike'
          ? 'Unliked'
          : 'Viewed';

      toast.success(`${label} content`);
    } catch (err) {
      console.error('Track error:', err);
      toast.error('Failed to track interaction');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderContentGrid = (items: ContentItem[]) => (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => {
        const id = item._id || item.contentId;
        return (
          <div
            key={id}
            className="bg-white shadow-md rounded-lg p-4 space-y-3 border border-gray-100"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">Type: {item.type}</p>
              {item.type === 'link' ? (
                <a
                  href={item.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm underline"
                >
                  {item.data}
                </a>
              ) : (
                <p className="text-sm text-gray-800">{item.data}</p>
              )}
            </div>

            {item.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 text-xs">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => trackInteraction(id!, 'view')}
                className="bg-blue-600 text-white text-xs px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                👁️ View
              </button>
              <button
                onClick={() => trackInteraction(id!, 'like')}
                className="bg-green-500 text-white text-xs px-4 py-2 rounded hover:bg-green-600 transition"
              >
                👍 Like
              </button>
              <button
                onClick={() => trackInteraction(id!, 'unlike')}
                className="bg-red-500 text-white text-xs px-4 py-2 rounded hover:bg-red-600 transition"
              >
                👎 Unlike
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">📡 Content & Recommendations</h1>

      {loading ? (
        <p>Loading content...</p>
      ) : (
        <>
          <section>
            <h2 className="text-xl font-semibold mb-4">🔥 Recommended for You</h2>
            {recommended.length === 0 ? (
              <p className="text-sm text-gray-500">No recommendations available.</p>
            ) : (
              renderContentGrid(recommended)
            )}
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">📦 All Content</h2>
            {allContent.length === 0 ? (
              <p className="text-sm text-gray-500">No content found.</p>
            ) : (
              renderContentGrid(allContent)
            )}
          </section>
        </>
      )}
    </div>
  );
}
