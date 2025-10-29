import {
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CardComponent } from '@/shared/components/card/card.component';
import { SavedArticlesService } from '@/services/saved-articles.service';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { APP_LABELS } from '@/shared/constants';
import { NewsArticle } from '@/shared/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-news-article-card',
  imports: [CardComponent, ButtonModule, DatePipe],
  templateUrl: './news-article-card.component.html',
  styleUrl: './news-article-card.component.scss',
})
export class NewsArticleCardComponent implements OnInit {
  appLabels = APP_LABELS;

  article: InputSignal<NewsArticle> = input.required<NewsArticle>();
  private savedArticleService = inject(SavedArticlesService);
  private destroyRef = inject(DestroyRef);

  isSaved: WritableSignal<boolean> = signal<boolean>(false);

  ngOnInit(): void {
    this.isSaved.set(
      this.savedArticleService.isArticleSaved(this.article().url),
    );
    this.savedArticleService.savedArticles$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.isSaved.set(
          this.savedArticleService.isArticleSaved(this.article().url),
        );
      });
  }

  onSaveChange(save: boolean) {
    this.isSaved.set(save);
    if (save) {
      this.savedArticleService.saveArticle(this.article());
    } else {
      this.savedArticleService.removeArticle(this.article());
    }
  }
}
