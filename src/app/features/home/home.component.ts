import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NewsService } from '@/services/news.service';
import { NewsArticleCardComponent } from '@/shared/components/news-article-card/news-article-card.component';
import {
  NEWS_API_DEFAULTS,
  NEWS_API_MESSAGES,
  NEWS_API_QUERY_PARAMS,
  SEVERITY,
} from '@/shared/constants';
import {
  NewsApiErrorResponse,
  NewsApiResponse,
  NewsArticle,
  NewsCategory,
} from '@/shared/types';

@Component({
  selector: 'app-home',
  imports: [NewsArticleCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private messageService: MessageService = inject(MessageService);
  private newsService: NewsService = inject(NewsService);
  private destroyRef: DestroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);

  loading: WritableSignal<boolean> = signal<boolean>(true);
  articles: WritableSignal<NewsArticle[]> = signal<NewsArticle[]>([]);
  totalArticles: WritableSignal<number> = signal<number>(0);

  ngOnInit(): void {
    const queryParamsSubscription: Subscription =
      this.activatedRoute.queryParams.subscribe((params) => {
        const query: string =
          params[NEWS_API_QUERY_PARAMS.Q] ?? NEWS_API_DEFAULTS.Q;
        const category: NewsCategory =
          params[NEWS_API_QUERY_PARAMS.CATEGORY] ?? NEWS_API_DEFAULTS.CATEGORY;
        const page: number = Number(
          params[NEWS_API_QUERY_PARAMS.PAGE] ?? NEWS_API_DEFAULTS.PAGE,
        );
        const pageSize: number = Number(
          params[NEWS_API_QUERY_PARAMS.PAGE_SIZE] ??
            NEWS_API_DEFAULTS.PAGE_SIZE,
        );
        this.fetchTopHeadlines(category, query, page, pageSize);
      });

    this.destroyRef.onDestroy(() => {
      queryParamsSubscription.unsubscribe();
    });
  }

  private fetchTopHeadlines(
    category: NewsCategory,
    query: string,
    page: number,
    pageSize: number,
  ): void {
    this.loading.set(true);
    this.newsService
      .getTopHeadlines(category, query, page, pageSize)
      .subscribe({
        next: (response: NewsApiResponse) => {
          console.log(response);
          this.articles.set(response.articles);
          this.totalArticles.set(response.totalResults);
          this.loading.set(false);
        },
        error: (error: HttpErrorResponse) => {
          const errResponse = error.error as NewsApiErrorResponse;
          this.messageService.add({
            severity: SEVERITY.ERROR,
            summary: NEWS_API_MESSAGES.FETCH_ERROR,
            detail: errResponse.message,
          });
        },
      });
  }
}
