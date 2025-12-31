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
      <TopNewsSidebar />
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
