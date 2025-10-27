import { NewsArticle } from '@/shared/types';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavedArticlesService {
  private storageKey = 'savedArticles';

  private savedArticles: BehaviorSubject<NewsArticle[]> = new BehaviorSubject(
    this.getSavedArticles(),
  );

  // observable to watch for changes in saved articles
  savedArticles$ = this.savedArticles.asObservable();

  getSavedArticles(): NewsArticle[] {
    const saved = localStorage.getItem(this.storageKey);
    return saved ? JSON.parse(saved) : [];
  }

  saveArticle(article: NewsArticle): void {
    const savedArticles: NewsArticle[] = this.getSavedArticles();
    if (!savedArticles.find((a) => a.url === article.url)) {
      savedArticles.push(article);
      localStorage.setItem(this.storageKey, JSON.stringify(savedArticles));
    }
  }

  removeArticle(article: NewsArticle): void {
    let savedArticles: NewsArticle[] = this.getSavedArticles();
    savedArticles = savedArticles.filter((a) => a.url !== article.url);
    localStorage.setItem(this.storageKey, JSON.stringify(savedArticles));
  }

  isArticleSaved(articleUrl: string): boolean {
    const savedArticles = this.getSavedArticles();
    return savedArticles.some((a) => a.url === articleUrl);
  }
}
