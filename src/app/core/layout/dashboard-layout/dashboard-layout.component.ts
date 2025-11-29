import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthPageActions } from '../../../features/auth/store/auth.actions';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { buttonLogoutLoading } from '../../store/ui/ui.constant';
import { selectLoadingKey } from '../../store/ui/ui.reducer';

@Component({
  selector: 'app-dashboard-layout',
  imports: [ButtonComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  private store = inject(Store);
  loading = this.store.selectSignal(selectLoadingKey(buttonLogoutLoading));
  logout() {
    this.store.dispatch(AuthPageActions.logoutSubmitted());
  }
}
