import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../../../shared/ui/button/button.component';
import { Store } from '@ngrx/store';
import { AuthPageActions } from '../../../auth/store/auth.actions';
import { selectLoading, selectLoadingKey } from '../../../../core/store/ui/ui.reducer';
import { buttonLogoutLoading } from '../../../../core/store/ui/ui.constant';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-account',
  imports: [RouterLink, RouterOutlet, RouterLinkActive, ButtonComponent, HeaderComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  private router = inject(Router);
  private store = inject(Store);
  loading = this.store.selectSignal(selectLoadingKey(buttonLogoutLoading));
  logout() {
    this.store.dispatch(AuthPageActions.logoutSubmitted());
  }
}
