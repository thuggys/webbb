import type { NextApiRequest, NextApiResponse } from 'next';

// Add proper type for RSS item
interface RSSItem {
  title: string
  link: string
  pubDate: string
  content?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const rssFeedUrl = 'https://developer.mozilla.org/en-US/blog/rss/html/feed.xml';
    const apiKey = process.env.RSS2JSON_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}&api_key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`RSS2JSON API error: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform data to match our schema
    const transformedData = {
      meta: {
        title: "MDN HTML Resources",
        source: "Mozilla Developer Network",
        lastUpdated: new Date().toISOString()
      },
      articles: data.items?.map((item: RSSItem) => ({
        title: item.title,
        url: item.link,
        date: new Date(item.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        summary: item.content?.substring(0, 150) + '...' || ''
      })) || []
    };

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(transformedData);
  } catch (error) {
    console.error('MDN Scraper Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch MDN content',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 