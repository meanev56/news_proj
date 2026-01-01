'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Article, fetchArticles, formatDate } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

const RecentSidebar = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        // Fetch most recent articles
        const fetchedArticles = await fetchArticles(undefined, 6);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching recent news:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-bold border-b-2 border-red-600 inline-block pb-1 mb-4">RECENT</h2>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="space-y-2 mb-6">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold border-b-2 border-red-600 inline-block pb-1 mb-4">RECENT</h2>
      <div className="space-y-6">
        {articles.map((article) => (
          <div key={article.id} className="border-b border-gray-200 pb-4">
            <Link href={`/article/${article.slug}`}>
              <h3 
                className="font-bold text-base mb-1 hover:text-[#205295] transition-colors" 
                dangerouslySetInnerHTML={{ __html: article.title.rendered }}
              ></h3>
            </Link>
            <p className="text-sm text-gray-500">{formatDate(article.date, { showTime: false, showRelative: true })}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSidebar;
