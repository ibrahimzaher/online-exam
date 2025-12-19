import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { Store } from '@ngrx/store';
import { AuthPageActions } from '../../../auth/store/auth.actions';
import { selectLoadingKey } from '../../../../core/store/ui/ui.reducer';
import { buttonLogoutLoading } from '../../../../core/store/ui/ui.constant';
import { HeaderComponent } from '../../../dashboard/components/header/header.component';

@Component({
  selector: 'app-account',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, ButtonComponent, HeaderComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  private store = inject(Store);
  linkItems = signal([
    { label: 'Profile', icon: 'pi pi-user', route: 'profile' },
    { label: 'Change Password', icon: 'pi pi-lock', route: 'change-password' },
  ]);
  loading = this.store.selectSignal(selectLoadingKey(buttonLogoutLoading));
  logout() {
    this.store.dispatch(AuthPageActions.logoutSubmitted());
  }
}
