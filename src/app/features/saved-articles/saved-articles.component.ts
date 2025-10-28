import { SavedArticlesService } from '@/services/saved-articles.service';
import { NewsArticle } from '@/shared/types';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { SavedArticleCardComponent } from './components/saved-article-card/saved-article-card.component';
import { APP_LABELS } from '@/shared/constants';

@Component({
  selector: 'app-saved-articles',
  imports: [ButtonModule, SavedArticleCardComponent],
  templateUrl: './saved-articles.component.html',
  styleUrl: './saved-articles.component.scss',
})
export class SavedArticlesComponent implements OnInit {
  appLabels = APP_LABELS;

  private savedArticlesService = inject(SavedArticlesService);
  private router = inject(Router);

  savedArticles: WritableSignal<NewsArticle[]> = signal([]);

  ngOnInit(): void {
    this.savedArticlesService.savedArticles$.subscribe((articles) => {
      this.savedArticles.set(articles);
    });
  }

  clearAll(): void {
    this.savedArticlesService.clearAll();
  }

  goBack(): void {
    this.router.navigate(['/']);
    // window.history.back();
  }
}
