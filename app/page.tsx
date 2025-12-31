import CategorySection from '@/components/CategorySection'
import FeaturedSection from '@/components/FeaturedSection'
import Footer from '@/components/Footer'
import LogoHeader from '@/components/LogoHeader'
import MainArticle from '@/components/MainArticle'
import Navbar from '@/components/Navbar'
import NewsGrid from '@/components/NewsGrid'
import RecentSidebar from '@/components/RecentSidebar'
import TopNewsSidebar from '@/components/TopNewsSidebar'

export default function Home() {
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
            ho
          </div>
          hom
        </div>
        Home
      </main>

      <MainArticle />
      <RecentSidebar />
      <FeaturedSection />
      <NewsGrid />
      <CategorySection />
      <Footer />
      Hello
    </div>
  )
}
