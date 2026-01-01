
// API endpoints
const API_BASE_URL = 'https://nairametrics.com/wp-json/wp/v2';

export interface Article {
  id: number;
  date: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url?: string;
      media_details?: {
        sizes?: {
          medium?: {
            source_url?: string;
          };
          full?: {
            source_url?: string;
          };
        };
      };
    }>;
  };
  link: string;
  slug: string;
  categories: number[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
}

// Fetch articles with embedding featured media and categories
export async function fetchArticles(categoryId?: number, perPage: number = 10): Promise<Article[]> {
  try {
    let url = `${API_BASE_URL}/posts?_embed=wp:featuredmedia&per_page=${perPage}`;
    
    if (categoryId) {
      url += `&categories=${categoryId}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Fetch a single article by slug
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const url = `${API_BASE_URL}/posts?slug=${slug}&_embed=wp:featuredmedia`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    
    const articles = await response.json();
    return articles.length > 0 ? articles[0] : null;
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

// Fetch categories
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories?per_page=100`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Helper to get image URL from article
export function getArticleImageUrl(article: Article): string {
  if (article._embedded && 
      article._embedded['wp:featuredmedia'] && 
      article._embedded['wp:featuredmedia'][0]) {
    
    const media = article._embedded['wp:featuredmedia'][0];
    
    // Try to get medium size first, then full, then source_url
    if (media.media_details?.sizes?.medium?.source_url) {
      return media.media_details.sizes.medium.source_url;
    } else if (media.media_details?.sizes?.full?.source_url) {
      return media.media_details.sizes.full.source_url;
    } else if (media.source_url) {
      return media.source_url;
    }
  }
  
  // Default placeholder image if no image is available
  return '/placeholder.svg';
}

interface DateFormatOptions {
  showTime?: boolean;
  showRelative?: boolean;
}

// Format date with more options
export function formatDate(dateString: string, options: DateFormatOptions = {}): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.abs(now.getTime() - date.getTime()) / 36e5;
  
  // Show relative time if requested and within 24 hours
  if (options.showRelative && diffInHours < 24) {
    if (diffInHours < 1) {
      const minutes = Math.round(diffInHours * 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    return `${Math.round(diffInHours)} ${Math.round(diffInHours) === 1 ? 'hr' : 'hrs'} ago`;
  }
  
  // Standard date format
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  if (options.showTime) {
    dateOptions.hour = '2-digit';
    dateOptions.minute = '2-digit';
  }
  
  return date.toLocaleDateString('en-US', dateOptions);
}

// Extract plain text from HTML
export function extractTextFromHTML(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}

// Truncate text to specified length
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
