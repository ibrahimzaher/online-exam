import { Component, inject, OnInit, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { ProgressBarModule } from 'primeng/progressbar';
import { Toast } from 'primeng/toast';
import { UiActions } from './core/store/ui/ui.actions';
import { routerLoading } from './core/store/ui/ui.constant';
import { ProgressComponent } from './shared/ui/progress/progress.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast, ProgressComponent, ProgressBarModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('online-exam');
  private store = inject(Store);
  private _router = inject(Router);
  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.store.dispatch(UiActions.startLoading({ key: routerLoading }));
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => this.store.dispatch(UiActions.stopLoading({ key: routerLoading })));
      }
    });
  }
}
