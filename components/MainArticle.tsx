'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Article, fetchArticles, getArticleImageUrl, formatDate } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

const MainArticle = () => {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true);
      try {
        const fetchedArticles = await fetchArticles(undefined, 1);
        if (fetchedArticles.length > 0) {
          setArticle(fetchedArticles[0]);
        }
      } catch (error) {
        console.error('Error fetching main article:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[300px] w-full rounded-lg" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <p className="text-gray-600">No featured article available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      <div className="h-[300px] relative">
        <img 
          src={getArticleImageUrl(article)} 
          alt={article.title.rendered}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <Link href={`/article/${article.slug}`}>
          <h2 
            className="text-2xl font-bold mb-2 hover:text-news-accent transition-colors" 
            dangerouslySetInnerHTML={{ __html: article.title.rendered }}
          ></h2>
        </Link>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <p>{formatDate(article.date)}</p>
        </div>
        <div 
          className="text-gray-700 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
        ></div>
        <div className="mt-4">
          <Link 
            href={`/article/${article.slug}`}
            className="inline-block bg-[#0A2647] text-white px-4 py-2 rounded hover:bg-[#144272] transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainArticle;
