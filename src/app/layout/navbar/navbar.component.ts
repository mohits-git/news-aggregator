import { SavedArticlesService } from '@/services/saved-articles.service';
import { LogoComponent } from '@/shared/components/icons/logo/logo.component';
import { APP_LABELS } from '@/shared/constants';
import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, MenubarModule, LogoComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private savedArticlesSerivce = inject(SavedArticlesService);
  savedArticles$ = this.savedArticlesSerivce.savedArticles$;
  totalSavedArticles = signal(0);

  appName = APP_LABELS.APP_NAME;

  ngOnInit() {
    this.savedArticles$.subscribe((articles) => {
      this.totalSavedArticles.set(articles.length);
    });
  }
}
