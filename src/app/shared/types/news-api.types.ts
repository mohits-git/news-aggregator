import { NewsArticle } from "./news-article.types";

export type NewsCategory =
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export type NewsApiResponseStatus = 'ok' | 'error';

export interface NewsApiResponse {
  status: NewsApiResponseStatus;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsApiErrorResponse {
  status: NewsApiResponseStatus;
  code: string;
  message: string;
}
