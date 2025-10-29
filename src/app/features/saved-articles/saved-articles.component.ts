import { SavedArticlesService } from '@/services/saved-articles.service';
import { NewsArticle } from '@/shared/types';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SavedArticleCardComponent } from './saved-article-card/saved-article-card.component';
import { APP_LABELS } from '@/shared/constants';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-saved-articles',
  imports: [ButtonModule, SavedArticleCardComponent],
  templateUrl: './saved-articles.component.html',
  styleUrl: './saved-articles.component.scss',
})
export class SavedArticlesComponent implements OnInit {
  appLabels = APP_LABELS;

  private savedArticlesService = inject(SavedArticlesService);
  private destroyRef = inject(DestroyRef);

  savedArticles: WritableSignal<NewsArticle[]> = signal([]);

  ngOnInit(): void {
    this.savedArticlesService.savedArticles$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((articles) => {
        this.savedArticles.set(articles);
      });
  }

  clearAll(): void {
    this.savedArticlesService.clearAll();
  }

  goBack(): void {
    window.history.back();
  }
}
