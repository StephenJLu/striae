import { useState, useEffect } from 'react';
import styles from './blog-feed.module.css';

interface BlogPost {
  title: string;
  link: string;
  description: string;
  pubDate: string;
}

export const BlogFeed = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogFeed = async () => {
      try {
        // Use a CORS proxy to fetch the RSS feed
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://blog.striae.org/rss.xml')}`);
        const data = await response.json() as { contents: string };
        
        // Parse the XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
        
        // Extract items
        const items = xmlDoc.querySelectorAll('item');
        const blogPosts: BlogPost[] = Array.from(items).slice(0, 3).map(item => {
          const title = item.querySelector('title')?.textContent || '';
          const link = item.querySelector('link')?.textContent || '';
          const description = item.querySelector('description')?.textContent || '';
          const pubDate = item.querySelector('pubDate')?.textContent || '';
          
          return {
            title: title.trim(),
            link: link.trim(),
            description: truncateDescription(description.trim()),
            pubDate: formatDate(pubDate)
          };
        });
        
        setPosts(blogPosts);
      } catch (err) {
        console.error('Error fetching blog feed:', err);
        setError('Unable to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogFeed();
  }, []);

  const truncateDescription = (text: string): string => {
    // Remove HTML tags if any
    const cleanText = text.replace(/<[^>]*>/g, '');
    
    // Split into sentences and take first 2-3 sentences
    const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const truncated = sentences.slice(0, 2).join('. ');
    
    return truncated + (sentences.length > 2 ? '...' : '.');
  };

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className={styles.blogSection}>
        <h2 className={styles.blogTitle}>News and Announcements</h2>
        <div className={styles.loading}>Loading latest posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.blogSection}>
        <h2 className={styles.blogTitle}>News and Announcements</h2>
        <div className={styles.error}>
          <p>{error}</p>
          <a 
            href="https://blog.striae.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.blogLink}
          >
            Visit the blog →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.blogSection}>
      <h2 className={styles.blogTitle}>News and Announcements</h2>
      <div className={styles.blogContent}>
        {posts.map((post, index) => (
          <article key={index} className={styles.blogPost}>
            <h3 className={styles.postTitle}>
              <a 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.titleLink}
              >
                {post.title}
              </a>
            </h3>
            <p className={styles.postDate}>{post.pubDate}</p>
            <p className={styles.postDescription}>{post.description}</p>
            <a 
              href={post.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.readMoreLink}
            >
              Read more →
            </a>
          </article>
        ))}
        <div className={styles.blogFooter}>
          <a 
            href="https://blog.striae.org" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.allPostsLink}
          >
            View all posts →
          </a>
        </div>
      </div>
    </div>
  );
};