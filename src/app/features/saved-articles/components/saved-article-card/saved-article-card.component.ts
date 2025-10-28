import { SavedArticlesService } from '@/services/saved-articles.service';
import { CardComponent } from '@/shared/components/card/card.component';
import { APP_LABELS } from '@/shared/constants';
import { NewsArticle } from '@/shared/types';
import { DatePipe } from '@angular/common';
import { Component, inject, input, InputSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-saved-article-card',
  imports: [CardComponent, ButtonModule, DatePipe],
  templateUrl: './saved-article-card.component.html',
  styleUrl: './saved-article-card.component.scss',
})
export class SavedArticleCardComponent {
  appLabels = APP_LABELS;

  private savedArticlesService = inject(SavedArticlesService);
  article: InputSignal<NewsArticle> = input.required<NewsArticle>();

  removeArticle(): void {
    this.savedArticlesService.removeArticle(this.article());
  }
}
