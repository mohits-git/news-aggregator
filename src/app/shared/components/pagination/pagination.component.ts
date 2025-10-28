import {
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { NEWS_API_DEFAULTS, NEWS_API_QUERY_PARAMS } from '@/shared/constants';

@Component({
  selector: 'app-pagination',
  imports: [PaginatorModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  totalRecords: InputSignal<number> = input.required<number>();

  page: WritableSignal<number> = signal<number>(1);
  pageSize: WritableSignal<number> = signal<number>(
    NEWS_API_DEFAULTS.PAGE_SIZE,
  );

  onPageChange(event: PaginatorState): void {
    this.page.set((event.page ?? 1) + 1);
    this.pageSize.set(event.rows ?? NEWS_API_DEFAULTS.PAGE_SIZE);
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: {
        page: (event.page ?? 1) + 1,
        pageSize: event.rows ?? NEWS_API_DEFAULTS.PAGE_SIZE,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnInit(): void {
    const subscription = this.route.queryParams.subscribe({
      next: (params: Params) => {
        const pageSize: number = Number(
          params[NEWS_API_QUERY_PARAMS.PAGE_SIZE] ??
            NEWS_API_DEFAULTS.PAGE_SIZE,
        );
        const page: number = Number(
          params[NEWS_API_QUERY_PARAMS.PAGE] ?? NEWS_API_DEFAULTS.PAGE,
        );
        this.pageSize.set(pageSize);
        this.page.set(page);
      },
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
