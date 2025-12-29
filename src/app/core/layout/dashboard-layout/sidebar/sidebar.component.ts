import { Component, inject, signal } from '@angular/core';
import { NavigationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { Avatar } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { AuthPageActions } from '../../../../features/auth/store/auth.actions';
import { selectUser } from '../../../../features/auth/store/auth.reducer';
import { LogoComponent } from '../../../../shared/ui/logo/logo.component';
@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, Avatar, Menu, Button, LogoComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  private store = inject(Store);
  user = this.store.selectSignal(selectUser);

  items: MenuItem[] | undefined;
  sidebarLinkedItems = signal([
    {
      label: 'Diploma',
      icon: 'pi pi-graduation-cap',
      route: 'diploma',
      activeRoutes: ['diploma', 'exam', 'question'],
    },
    { label: 'Account Settings', icon: 'pi pi-user', route: 'account', activeRoutes: ['account'] },
  ]);
  router = inject(Router);
  isActiveRoute(route: string[] | string): boolean {
    if (Array.isArray(route)) {
      return route.some((r) => this.router.url.includes(r));
    }
    return this.router.url.includes(route);
  }
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
