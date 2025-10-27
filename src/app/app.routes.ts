import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'saved-articles',
    loadComponent: () =>
      import('./features/saved-articles/saved-articles.component').then(
        (m) => m.SavedArticlesComponent,
      ),
  },
];
