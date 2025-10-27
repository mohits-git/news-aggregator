import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { customPreset } from './shared/theme/custom-preset';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { newsAPIInterceptor } from './interceptors/news-api.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      }),
    ),
    provideHttpClient(withInterceptors([newsAPIInterceptor])),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: customPreset,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
  ],
};
