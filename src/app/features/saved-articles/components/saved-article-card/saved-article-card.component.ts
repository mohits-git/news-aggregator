import { SavedArticlesService } from '@/services/saved-articles.service';
import { CardComponent } from '@/shared/components/card/card.component';
import { ReadMoreButtonComponent } from '@/shared/components/read-more-button/read-more-button.component';
import { NewsArticle } from '@/shared/types';
import { DatePipe } from '@angular/common';
import { Component, inject, input, InputSignal } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-saved-article-card',
  imports: [CardComponent, ButtonModule, DatePipe, ReadMoreButtonComponent],
  templateUrl: './saved-article-card.component.html',
  styleUrl: './saved-article-card.component.scss',
})
export class SavedArticleCardComponent {
  private savedArticlesService = inject(SavedArticlesService);
  article: InputSignal<NewsArticle> = input.required<NewsArticle>();

  removeArticle(): void {
    this.savedArticlesService.removeArticle(this.article());
  }
}
