import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProgressBar } from 'primeng/progressbar';
import { selectLoading } from '../../../core/store/ui/ui.reducer';

@Component({
  selector: 'app-progress',
  imports: [ProgressBar],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export class ProgressComponent {
  private readonly store = inject(Store);
  isLoading = this.store.selectSignal(selectLoading);
}
