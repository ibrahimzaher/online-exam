import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
@Component({
  selector: 'app-dashboard-layout',
  imports: [
    DrawerModule,
    ButtonModule,
    AvatarModule,
    RouterOutlet,
    SidebarComponent,
    TopBarComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  visible = false;
}
