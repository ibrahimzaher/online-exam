import { Component, inject, ViewChild } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule, Button } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule, Avatar } from 'primeng/avatar';
import { StyleClass } from 'primeng/styleclass';
import { Drawer } from 'primeng/drawer';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';
import { selectUser } from '../../../../features/auth/store/auth.reducer';
import { LogoComponent } from '../../../../shared/ui/logo/logo.component';
import { AuthPageActions } from '../../../../features/auth/store/auth.actions';
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Avatar, Menu, Button, LogoComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private store = inject(Store);
  user = this.store.selectSignal(selectUser);

  items: MenuItem[] | undefined;
  logout() {
    this.store.dispatch(AuthPageActions.logoutSubmitted());
  }
  ngOnInit() {
    this.items = [
      {
        items: [
          {
            label: 'Account',
            icon: 'pi pi-user',
            routerLink: 'account',
          },
          {
            separator: true,
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            iconClass: 'text-danger-500',
            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];
  }
}
