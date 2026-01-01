
import Link from 'next/link';
import { Article, getArticleImageUrl, formatDate, extractTextFromHTML, truncateText } from '@/lib/api';

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'horizontal' | 'minimal' | 'featured';
}

const ArticleCard = ({ article, variant = 'default' }: ArticleCardProps) => {
  const imageUrl = getArticleImageUrl(article);
  const title = article.title.rendered;
  const date = formatDate(article.date);
  const excerpt = extractTextFromHTML(article.excerpt.rendered);
  
  if (variant === 'featured') {
    return (
      <Link href={`/article/${article.slug}`} className="block">
        <div className="relative h-80 rounded-lg overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h3 
              className="text-xl md:text-2xl font-bold text-white mb-2" 
              dangerouslySetInnerHTML={{ __html: title }}
            ></h3>
            <div className="text-sm text-gray-200">{date}</div>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'horizontal') {
    return (
      <Link href={`/article/${article.slug}`} className="block h-full">
        <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="h-64 relative">
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex-grow">
            <div className="text-sm text-gray-500 mb-2">{date}</div>
            <h3 
              className="text-xl font-bold mb-2 hover:text-news-accent transition-colors" 
              dangerouslySetInnerHTML={{ __html: title }}
            ></h3>
            <p className="text-gray-600 line-clamp-3">
              {truncateText(excerpt, 150)}
            </p>
          </div>
        </div>
      </Link>
    );
  }
  
  if (variant === 'minimal') {
    return (
      <Link href={`/article/${article.slug}`} className="block">
        <div className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
          <h3 
            className="font-medium text-sm hover:text-[#205295] transition-colors line-clamp-2" 
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>
          <div className="text-xs text-gray-500 mt-1">{date}</div>
        </div>
      </Link>
    );
  }
  
  // Default card
  return (
    <Link href={`/article/${article.slug}`} className="block h-full">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
        <div className="h-48 relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="text-sm text-gray-500 mb-2">{date}</div>
          <h3 
            className="text-lg font-bold mb-2 hover:text-news-accent transition-colors line-clamp-2" 
            dangerouslySetInnerHTML={{ __html: title }}
          ></h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {truncateText(excerpt, 100)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
