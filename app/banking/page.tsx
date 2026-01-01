'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Article, fetchArticles, formatDate } from '@/lib/api';
import Navbar from '@/components/Navbar';
import LogoHeader from '@/components/LogoHeader';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Banking = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);

  useEffect(() => {
    document.title = "Banking News - BusinessDay";
    
    // Show a welcome toast
    toast({
      title: "Banking & Finance News",
      description: "Latest news and updates from the banking sector.",
    });
    
    const loadArticles = async () => {
      setIsLoading(true);
      try {
        // Using API endpoint with business category
        // This is for demo purposes - ideally we would use a dedicated banking category ID
        const fetchedArticles = await fetchArticles(undefined, 15);
        
        if (fetchedArticles.length > 0) {
          // Set the first article as featured
          setFeaturedArticle(fetchedArticles[0]);
          // Set the rest as regular articles
          setArticles(fetchedArticles.slice(1));
        }
      } catch (error) {
        console.error('Error loading banking articles:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadArticles();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <LogoHeader />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#0A2647]">Banking</h1>
          <Link href="/rss" aria-label="RSS Feed">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
              <path d="M4 11a9 9 0 0 1 9 9"></path>
              <path d="M4 4a16 16 0 0 1 16 16"></path>
              <circle cx="5" cy="19" r="1"></circle>
            </svg>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="space-y-8">
            <Skeleton className="h-64 w-full rounded-md" />
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex gap-4">
                <Skeleton className="h-24 w-32 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured article */}
            {featuredArticle && (
              <div className="bg-white rounded-lg overflow-hidden shadow-sm mb-8">
                <Link href={`/article/${featuredArticle.slug}`} className="block">
                  <div className="md:flex">
                    <div className="md:w-1/2 h-64 md:h-auto relative">
                      <img 
                        src={featuredArticle._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'} 
                        alt={featuredArticle.title.rendered}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6 md:w-1/2 flex flex-col justify-between">
                      <div>
                        <h2 
                          className="text-2xl font-bold hover:text-[#205295] transition-colors mb-3" 
                          dangerouslySetInnerHTML={{ __html: featuredArticle.title.rendered }}
                        ></h2>
                        <div 
                          className="text-gray-700 line-clamp-3 mb-4"
                          dangerouslySetInnerHTML={{ __html: featuredArticle.excerpt.rendered }}
                        ></div>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm">
                        <span>{formatDate(featuredArticle.date)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}
            
            {/* List of articles */}
            <div className="space-y-6">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <Link href={`/article/${article.slug}`} className="flex flex-col sm:flex-row hover:bg-gray-50 transition-colors">
                    <div className="sm:w-1/4 h-40 sm:h-auto relative">
                      <img 
                        src={article._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg'} 
                        alt={article.title.rendered}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 sm:p-6 sm:w-3/4">
                      <h3 
                        className="text-lg font-semibold mb-2 hover:text-[#205295] transition-colors" 
                        dangerouslySetInnerHTML={{ __html: article.title.rendered }}
                      ></h3>
                      <div className="text-sm text-gray-500 mb-2">{formatDate(article.date)}</div>
                      <div 
                        className="text-gray-600 text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: article.excerpt.rendered }}
                      ></div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="mx-1">1</Button>
              <Button variant="outline" className="mx-1">2</Button>
              <Button variant="outline" className="mx-1">3</Button>
              <Button variant="outline" className="mx-1 flex items-center">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Banking;
