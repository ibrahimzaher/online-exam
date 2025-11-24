import { Component, inject, signal, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Toast } from 'primeng/toast';
import { ProgressComponent } from './shared/ui/progress/progress.component';
import { LoadingService } from './core/services/loading.service';
import { ProgressBarModule } from 'primeng/progressbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ProgressComponent, ProgressBarModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('online-exam');
  private _loading = inject(LoadingService);
  private _router = inject(Router);
  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this._loading.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => this._loading.hide());
      }
    });
  }
}
