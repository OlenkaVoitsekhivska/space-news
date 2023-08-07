export interface Article {
  id: number;
  title: string;
  url: string;
  image_url: string;
  news_site: string;
  summary: string;
  published_at: string;
  updated_at: string;
  featured: boolean;
  launches: Launch[];
  events: Event[];
}

interface Launch {
  launch_id: string;
  provider: string;
}

interface Event {
  event_id: number;
  provider: string;
}

export interface ArticleResponse {
  count: number;
  next: string;
  previous: string;
  results: Article[];
}
