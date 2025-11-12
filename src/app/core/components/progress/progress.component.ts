import { Component, computed, inject } from '@angular/core';
import { ProgressBar } from "primeng/progressbar";
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-progress',
  imports: [ProgressBar],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export class ProgressComponent {
  private readonly _loading = inject(LoadingService);
  isLoading = computed(() => this._loading.loading());
}
