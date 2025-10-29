import { SavedArticlesService } from '@/services/saved-articles.service';
import { LogoComponent } from '@/shared/components/icons/logo/logo.component';
import { APP_LABELS } from '@/shared/constants';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { map } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, MenubarModule, LogoComponent, RouterLink, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  appName = APP_LABELS.APP_NAME;
  private savedArticlesSerivce = inject(SavedArticlesService);
  totalSavedArticles$ = this.savedArticlesSerivce.savedArticles$.pipe(
    map((articles) => articles.length),
  );
}
