import { Component, DestroyRef, inject } from '@angular/core';
import { LogoutUsecaseService } from '@izaher-dev/auth';
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard-layout',
  imports: [ButtonComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  private readonly _logoutUsecase = inject(LogoutUsecaseService);
  private readonly _storage = inject(StorageService);
  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);
  logout() {
    this._logoutUsecase.execute().pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(
      data => {
        this._storage.removeItem('token');
        this._router.navigate(['/login'], { replaceUrl: true });
      }
    )
  }
}
