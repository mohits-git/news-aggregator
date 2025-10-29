import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { buildNewsAPIPath } from '@/shared/utils/api.utils';
import { NEWS_API_ENDPOINTS } from '@/shared/constants';
import { NewsApiQueryOptions, NewsApiResponse } from '@/shared/types';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  httpClient: HttpClient = inject(HttpClient);

  getTopHeadlines(options: NewsApiQueryOptions): Observable<NewsApiResponse> {
    return this.httpClient.get<NewsApiResponse>(
      buildNewsAPIPath(NEWS_API_ENDPOINTS.TOP_HEADLINES),
      {
        params: {
          category: options.category,
          q: options.query,
          page: options.page.toString(),
          pageSize: options.pageSize.toString(),
        },
      },
    );
  }
}
