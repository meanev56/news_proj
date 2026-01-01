'use client'

import { useEffect, useState } from 'react';
import { Article, fetchArticles } from '@/lib/api';
import ArticleCard from '@/components/ArticleCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  categoryId: number;
  title: string;
}

const CategorySection = ({ categoryId, title }: CategorySectionProps) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        const fetchedArticles = await fetchArticles(categoryId, 4);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error(`Error fetching ${title} articles:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [categoryId, title]);

  if (isLoading) {
    return (
      <div className="my-8">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 inline-block pb-1 mb-6">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold border-b-2 border-red-600 inline-block pb-1">{title}</h2>
        <Button variant="ghost" className="text-[#0A2647] hover:text-[#205295] flex items-center">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
