import { Routes } from '@angular/router';
import { APP_ROUTES } from './shared/constants';

export const routes: Routes = [
  {
    path: APP_ROUTES.HOME,
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: APP_ROUTES.SAVED_ARTICLES,
    loadComponent: () =>
      import('./features/saved-articles/saved-articles.component').then(
        (m) => m.SavedArticlesComponent,
      ),
  },
];
