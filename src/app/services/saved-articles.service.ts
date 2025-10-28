import { SAVED_ARTICLES_STORAGE_KEY } from '@/shared/constants';
import { NewsArticle } from '@/shared/types';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavedArticlesService {
  private storageKey = SAVED_ARTICLES_STORAGE_KEY;

  private getSavedArticlesFromLocalStorage(): NewsArticle[] {
    const saved = localStorage.getItem(this.storageKey);
    const savedArticles = saved ? JSON.parse(saved) : [];
    return savedArticles;
  }

  private savedArticles: BehaviorSubject<NewsArticle[]> = new BehaviorSubject(
    this.getSavedArticlesFromLocalStorage(),
  );
  savedArticles$ = this.savedArticles.asObservable();

  saveArticle(article: NewsArticle): void {
    const savedArticles: NewsArticle[] = this.savedArticles.getValue();
    if (!savedArticles.find((a) => a.url === article.url)) {
      savedArticles.push(article);
      this.savedArticles.next([...savedArticles]);
      localStorage.setItem(this.storageKey, JSON.stringify(savedArticles));
    }
  }

  removeArticle(article: NewsArticle): void {
    let savedArticles: NewsArticle[] = this.savedArticles.getValue();
    savedArticles = savedArticles.filter((a) => a.url !== article.url);
    this.savedArticles.next([...savedArticles]);
    localStorage.setItem(this.storageKey, JSON.stringify(savedArticles));
  }

  clearAll(): void {
    this.savedArticles.next([]);
    localStorage.removeItem(this.storageKey);
  }

  isArticleSaved(articleUrl: string): boolean {
    const savedArticles = this.savedArticles.getValue();
    return savedArticles.some((a) => a.url === articleUrl);
  }
}
