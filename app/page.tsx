'use client'

import CategorySection from '@/components/CategorySection'
import FeaturedSection from '@/components/FeaturedSection'
import Footer from '@/components/Footer'
import LogoHeader from '@/components/LogoHeader'
import MainArticle from '@/components/MainArticle'
import Navbar from '@/components/Navbar'
import NewsGrid from '@/components/NewsGrid'
import RecentSidebar from '@/components/RecentSidebar'
import TopNewsSidebar from '@/components/TopNewsSidebar'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast';
import { Category, fetchCategories } from '@/lib/api'

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Welcome toast when the page loads
    toast({
      title: "Welcome to BusinessDay News",
      description: "Get the latest news and insights from Nigeria's leading business newspaper.",
    });
    
    // Load categories
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories.filter(cat => cat.count > 0).slice(0, 4));
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCategories();
  }, []);

  return (
    <div className='min-h-screen flex flex-col bg-gray-100  '>
      <LogoHeader />
      <Navbar />
      <main className='flex-grow'>
        <div className='container mx-auto px-4 py-6'>

          {/* Top section with 3-column layout */}
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8'>
            <div className='lg:col-span-4'>
              <TopNewsSidebar />
            </div>
            <div className='lg:col-span-4'>
              <MainArticle />
            </div>
            <div className='lg:col-span-4'>
              <RecentSidebar />
            </div>
          </div>

          {/* Featuresd section */}
          <FeaturedSection />

          <div className='my-8'>
            <h2 className="text-2xl font-bold border-b-2 border-red-600 inline-block pb-1 mb-6">LATEST NEWS</h2>
            <NewsGrid />
          </div>

          {/* Category sections */}
          {!isLoading && categories.map(category => (
            <CategorySection 
              key={category.id} 
              categoryId={category.id} 
              title={category.name.toUpperCase()} 
            />
          ))}
        </div>

      </main>
      <Footer />
    </div>
  )
}
