'use client'

import { useEffect, useState } from 'react';
import { Article, fetchArticles } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';
import ArticleCard from './ArticleCard';

const FeaturedSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        const fetchedArticles = await fetchArticles(undefined, 5);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error('Error fetching featured articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (isLoading) {
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 inline-block pb-1 mb-6">FEATURED</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-64 lg:h-96 w-full rounded-lg" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-32 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  // Separate the first article from the rest for featured display
  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 5);

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold border-b-2 border-red-600 inline-block pb-1 mb-6">FEATURED</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          <ArticleCard article={mainArticle} variant="horizontal" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sideArticles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
