import { CATEGORY_OPTIONS, NEWS_API_CATEGORIES } from '@/shared/constants';
import { DropdownOption, NewsCategory } from '@/shared/types';
import { Component, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoComplete } from 'primeng/autocomplete';

@Component({
  selector: 'app-category-selector',
  imports: [AutoComplete, FormsModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.scss',
})
export class CategorySelectorComponent {
  private categoryDropdown = viewChild<AutoComplete>('categoryDropdown');
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  categoryOptions: DropdownOption[] = CATEGORY_OPTIONS;
  category: NewsCategory = NEWS_API_CATEGORIES.GENERAL;

  filterCategories(query: string): void {
    query = query.toLowerCase().trim();
    if (!query) {
      this.categoryOptions = CATEGORY_OPTIONS;
    } else {
      this.categoryOptions = this.categoryOptions.filter((category) =>
        category.label.toLowerCase().includes(query),
      );
    }
  }

  onSelect() {
    this.categoryDropdown()?.hide();
    this.router.navigate(['./'], {
      relativeTo: this.route,
      queryParams: {
        category: this.category,
      },
      queryParamsHandling: 'merge',
    });
  }
}
