import { environment } from "../../../environments/environment";
import { NewsCategory } from "../types";

export const NEWS_API_RELATIVE_PATH = '/api/news';

export const NEWS_API_BASE_URL = environment.newsApiBaseUrl;

export const NEWS_API_KEY_HEADER = 'X-Api-Key';

export const NEWS_API_KEY = environment.newsApiKey;

export const NEWS_API_ENDPOINTS = {
  TOP_HEADLINES: '/top-headlines',
  EVERYTHING: '/everything',
  SOURCES: '/sources',
} as const;

export const NEWS_API_QUERY_PARAMS = {
  COUNTRY: 'country',
  CATEGORY: 'category',
  Q: 'q',
  SOURCES: 'sources',
  PAGE: 'page',
  PAGE_SIZE: 'pageSize',
} as const;

export const NEWS_API_DEFAULTS = {
  Q: '',
  COUNTRY: 'in',
  CATEGORY: 'general' as NewsCategory,
  PAGE: 1,
  PAGE_SIZE: 10,
} as const;

export const NEWS_API_CATEGORIES = {
  BUSINESS: 'business',
  ENTERTAINMENT: 'entertainment',
  GENERAL: 'general',
  HEALTH: 'health',
  SCIENCE: 'science',
  SPORTS: 'sports',
  TECHNOLOGY: 'technology',
} as const;

export const NEWS_API_CATEGORY_LIST = Object.values(NEWS_API_CATEGORIES) as NewsCategory[];

export const NEWS_API_MESSAGES = {
  FETCH_ERROR: 'Failed to fetch news articles. Please try again later.',
} as const;
