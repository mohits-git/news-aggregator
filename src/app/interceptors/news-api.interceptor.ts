import {
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
  NEWS_API_KEY_HEADER,
  NEWS_API_RELATIVE_PATH,
} from '@/shared/constants';
import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export const newsAPIInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  if (req.url.startsWith(NEWS_API_RELATIVE_PATH)) {
    req = req.clone({
      url: req.url.replace(NEWS_API_RELATIVE_PATH, NEWS_API_BASE_URL),
      headers: req.headers.set(NEWS_API_KEY_HEADER, NEWS_API_KEY),
    });
  }
  return next(req);
};
