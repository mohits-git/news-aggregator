import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  map,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-search-box',
  imports: [InputTextModule, FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  query = new BehaviorSubject<string>('');

  onQueryChange(value: string) {
    this.query.next(value);
  }

  ngOnInit(): void {
    const subscription: Subscription = this.query
      .pipe(
        map((q: string) => q.trim()),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe({
        next: (value: string) => {
          this.router.navigate(['./'], {
            relativeTo: this.route,
            queryParamsHandling: 'merge',
            queryParams: {
              q: value,
            },
          });
        },
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
