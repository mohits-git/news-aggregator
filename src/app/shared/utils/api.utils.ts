import { NEWS_API_RELATIVE_PATH } from "../constants";

export const buildNewsAPIPath = (endpoint: string): string => {
  return `${NEWS_API_RELATIVE_PATH}${endpoint}`;
}
