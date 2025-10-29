import { APP_LABELS } from '@/shared/constants';
import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-read-more-button',
  imports: [],
  templateUrl: './read-more-button.component.html',
  styleUrl: './read-more-button.component.scss'
})
export class ReadMoreButtonComponent {
  appLabels = APP_LABELS;
  articleUrl: InputSignal<string> = input.required<string>();
}
